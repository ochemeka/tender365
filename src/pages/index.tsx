
import Link from 'next/link'
export default function Home(){ return (
  <div style={{padding:40}}>
    <h1>Tender365</h1>
    <p>Welcome to Tender365 scaffold. <Link href='/api/auth/signin'>Sign in</Link></p>
  </div>
)}
