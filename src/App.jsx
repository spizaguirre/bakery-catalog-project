import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Voting from './components/Voting'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  // Estado inicial: leer de localStorage o preferencia del sistema
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark') return true
      if (savedTheme === 'light') return false
      
      // Si no hay preferencia guardada, usar la del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false // Por defecto: claro
  })

  // Aplicar/remover clase dark en el HTML
  useEffect(() => {
    const root = document.documentElement
    
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="bg-white dark:bg-neutral-900 font-custom text-neutral-800 dark:text-neutral-200 min-h-screen">
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      <Header />
      <Hero />
      <Features />
      <Products />
      <About />
      <Testimonials />
      <Voting />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App