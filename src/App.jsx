// app.jsx - VERSIÓN CORREGIDA
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Voting from './components/Voting';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './components/AdminPanel'; // <-- IMPORTAR AdminPanel

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') return true;
      if (savedTheme === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 font-custom text-neutral-800 dark:text-neutral-200 min-h-screen">
      {/* Mostrar AdminPanel o contenido normal */}
      {showAdmin ? (
        // PANEL ADMIN COMPLETO
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
          <button
            onClick={() => setShowAdmin(false)}
            className="fixed top-6 left-6 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2 shadow-lg"
          >
            <i className="fas fa-arrow-left"></i>
            Volver al sitio
          </button>
          
          {/* Renderizar el componente AdminPanel */}
          <AdminPanel />
        </div>
      ) : (
        // PÁGINA NORMAL
        <>
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
          
          {/* Botón para mostrar admin */}
          <button
            onClick={() => setShowAdmin(true)}
            className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            title="Panel de Administración"
          >
            <i className="fas fa-plus text-lg"></i>
          </button>
        </>
      )}
    </div>
  );
}

export default App;