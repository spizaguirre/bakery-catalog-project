import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'products', label: 'Productos' },
    { id: 'about', label: 'Nosotros' },
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'contact', label: 'Contacto' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="section-gradient-2 shadow-sm sticky top-0 z-40 border-b border-brand-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo y nombre */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 flex items-center justify-center shadow-md">
            <i className="fas fa-cupcake text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-brand-titulo-logo">
              Horneando<span className="text-brand-pink-500"> con Amor</span>
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Repostería Artesanal</p>
          </div>
        </div>

        {/* Navegación para desktop */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-brand-content hover:text-brand-pink-500 dark:hover:text-brand-pink-300 transition-colors font-medium whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
          
          {/* Botón de pedido - VISIBLE SOLO EN DESKTOP */}
          <button
            onClick={() => scrollToSection('contact')}
            className="ml-4 px-4 py-2 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white rounded-full text-sm hover:shadow-lg transition-all font-medium whitespace-nowrap"
          >
            <i className="fas fa-shopping-cart mr-2"></i>Hacer Pedido
          </button>
        </nav>

        {/* Menú móvil y botón de pedido móvil */}
        <div className="flex items-center space-x-4">
          {/* Botón de pedido para móvil/tablet */}
          <button
            onClick={() => scrollToSection('contact')}
            className="lg:hidden px-3 py-2 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white rounded-full text-xs hover:shadow-lg transition-all font-medium whitespace-nowrap"
          >
            <i className="fas fa-shopping-cart mr-1"></i>Pedido
          </button>
          
          {/* Botón del menú hamburguesa */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral-700 dark:text-neutral-300 p-2 lg:hidden"
            aria-label="Menú"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden bg-nav-bg border-t border-nav-border shadow-lg py-4 px-4 sm:px-6 transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className="text-brand-content hover:text-brand-pink-500 hover:bg-brand-pink-50/50 dark:hover:bg-neutral-700/50 transition-all font-medium py-3 px-4 text-left text-base sm:text-lg rounded-xl border-b border-nav-border/50 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
            
            {/* Botón de pedido destacado en el menú móvil */}
            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="mt-4 w-full bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white font-bold py-4 rounded-2xl hover:shadow-pink-500/20 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fas fa-shopping-cart"></i>
              <span>Hacer Pedido Ahora</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;