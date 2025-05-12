import '@/App.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import { CalculadoraForm } from '@/components/calc-form'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Navbar />
      <div className='w-full h-full'>
        <CalculadoraForm />
      </div>
    </ThemeProvider>
  )
}

export default App
