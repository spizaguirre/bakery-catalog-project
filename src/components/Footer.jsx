const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="py-16 bg-white dark:bg-neutral-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl text-brand-pink-500 dark:text-brand-pink-300 font-bold mb-4">
                Horneando<span className="text-accent"> con Amor</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Repostería artesanal con ingredientes de calidad y mucho amor. Creando momentos dulces para ocasiones especiales.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/horneando_con_amor24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-pink-500 dark:text-brand-pink-300 hover:text-brand-pink-600"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-brand-pink-400 dark:text-brand-pink-300 hover:text-brand-pink-600">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://wa.me/593986656631"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-pink-500 dark:text-brand-pink-300 hover:text-brand-pink-600"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-brand-pink-500 dark:text-brand-pink-300 mb-4">Productos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500">Tortas Personalizadas</a></li>
                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500">Cupcakes Decorados</a></li>
                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500">Galletas Artesanales</a></li>
                <li><a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500">Postres Individuales</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-pink-500 dark:text-brand-pink-300 mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('products')}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500 text-left"
                  >
                    Nuestros Productos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500 text-left"
                  >
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500 text-left"
                  >
                    Testimonios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-brand-pink-500 text-left"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-pink-500 dark:text-brand-pink-300 mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-phone mt-1 mr-2 text-accent"></i>
                  <span className="text-neutral-600 dark:text-neutral-400">+593 986656631</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-2 text-accent"></i>
                  <span className="text-neutral-600 dark:text-neutral-400">pedidos@dulcetentacion.com</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-2 text-accent"></i>
                  <span className="text-neutral-600 dark:text-neutral-400">Guayaquil, Ecuador</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-pink-600 dark:bg-neutral-900 text-white pt-2 pb-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center border-pink-400 dark:border-neutral-700 pt-6">
          <p className="text-pink-100 dark:text-neutral-400">
            © 2025 <span className="font-semibold text-white dark:text-pink-400">Horneando con Amor</span>. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;