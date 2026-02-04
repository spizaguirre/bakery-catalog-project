// App.jsx - VERSIÓN CON REACT ROUTER FUNCIONAL
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import WhatsAppButton from './components/WhatsAppButton';
import Features from './components/Features';

// Componentes de administración
import AdminPanel from './components/AdminPanel';
import ProductosAdmin from './components/ProductosAdmin';
import EditarProducto from './components/EditarProducto';

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

  // Componente de página principal
  const HomePage = () => (
    <>
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      <Header />
      <Hero />
      <Features />
      <Products />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
      
      {/* Botones flotantes para admin */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
        <a
          href="/admin/nuevo"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          title="Agregar Producto"
        >
          <i className="fas fa-plus"></i>
        </a>
        <a
          href="/admin/productos"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          title="Gestionar Productos"
        >
          <i className="fas fa-list"></i>
        </a>
      </div>
    </>
  );

  // Componente con botón de volver
  const AdminLayout = ({ children, backTo = "/" }) => (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <a
        href={backTo}
        className="fixed top-6 left-6 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 flex items-center gap-2"
      >
        <i className="fas fa-arrow-left"></i>
        Volver
      </a>
      {children}
    </div>
  );

  return (
    <div className="bg-white dark:bg-neutral-900 font-custom text-neutral-800 dark:text-neutral-200 min-h-screen">
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* Crear nuevo producto */}
        <Route path="/admin/nuevo" element={
          <AdminLayout>
            <AdminPanel />
          </AdminLayout>
        } />
        
        {/* Listar productos */}
        <Route path="/admin/productos" element={
          <AdminLayout>
            <ProductosAdmin />
          </AdminLayout>
        } />
        
        {/* Editar producto */}
        <Route path="/admin/editar/:id" element={
          <AdminLayout backTo="/admin/productos">
            <EditarProducto />
          </AdminLayout>
        } />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;