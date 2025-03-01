import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button variant="link"><Link href="/">Return Home</Link></Button>
      
    </div>
  )
}