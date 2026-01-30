const Footer = () => {
  return (
    <footer className="bg-brand-pink-600 dark:bg-neutral-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-brand-pink-100 dark:text-neutral-400">
          © 2026 <span className="font-semibold text-white">Horneando con Amor</span>. Todos los derechos reservados.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-brand-pink-200 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
          <a href="#" className="hover:text-brand-pink-200 transition-colors"><i className="fab fa-whatsapp text-xl"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;