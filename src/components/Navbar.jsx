import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-sm sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-700 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 flex items-center justify-center shadow-md">
            <span className="text-white text-lg">🧁</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-800 dark:text-white">
              Horneando<span className="text-brand-pink-500"> con Amor</span>
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Repostería Artesanal</p>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          {['Products', 'About', 'Testimonials', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-neutral-700 dark:text-neutral-300 hover:text-brand-pink-500 transition-colors font-medium">
              {item === 'Products' ? 'Productos' : item === 'About' ? 'Nosotros' : item === 'Testimonials' ? 'Testimonios' : 'Contacto'}
            </a>
          ))}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neutral-700 dark:text-neutral-300">
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-800 py-4 px-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col space-y-4">
            <a href="#products" className="text-neutral-700 dark:text-neutral-300 py-2">Productos</a>
            <a href="#contact" className="text-neutral-700 dark:text-neutral-300 py-2">Contacto</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;