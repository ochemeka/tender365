
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: {label:'Email', type:'text'}, password:{label:'Password', type:'password'} },
      async authorize(credentials) {
        if(!credentials) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if(!user || !user.password) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if(!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    }),
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    GitHubProvider({ clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user = session.user || {};
      (session.user as any).id = token.sub;
      (session.user as any).role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if(user) token.role = (user as any).role;
      return token;
    }
  }
})
