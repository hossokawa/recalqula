import { ModeToggle } from '@/components/mode-toggle'

function Navbar() {
  return (
    <div className='flex justify-between'>
      <h1 className='text-4xl font-semibold'>reCalqula</h1>
      <ModeToggle />
    </div>
  )
}

export default Navbar
