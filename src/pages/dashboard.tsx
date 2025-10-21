
import { useSession, signIn } from 'next-auth/react'
export default function Dashboard(){
  const { data: session, status } = useSession();
  if(status === 'loading') return <div>Loading...</div>;
  if(!session){ signIn(); return null; }
  return <div style={{padding:40}}><h2>Dashboard</h2><p>Welcome, {session.user?.email}</p></div>
}
