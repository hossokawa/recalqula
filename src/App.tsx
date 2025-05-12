import '@/App.css'
import Navbar from '@/components/navbar'
import { CalculadoraForm } from '@/components/calc-form'

function App() {
  return (
    <div className='space-y-16'>
      <Navbar />
      <div>
        <CalculadoraForm />
      </div>
    </div>
  )
}

export default App
