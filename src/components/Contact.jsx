const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Mensaje enviado. ¡Gracias por contactarnos!');
  };

  return (
    <section id="contact" className="py-16 section-gradient-3">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-subtitles-2">Haz Tu Pedido</h2>
          <p className="max-w-2xl mx-auto text-brand-content">
            Contáctanos para consultas, cotizaciones y pedidos personalizados
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-brand-box rounded-2xl overflow-hidden shadow-lg border border-brand-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-6 text-brand-titulo-logo">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-phone mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-brand-titulo-logo">Teléfono</h4>
                    <p className="text-brand-content">+593 986656631</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-brand-titulo-logo">Email</h4>
                    <p className="text-brand-content">pedidos@dulcetentacion.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-brand-titulo-logo">Dirección</h4>
                    <p className="text-brand-content">Guayaquil, Ecuador</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-clock mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-brand-titulo-logo">Horario de Atención</h4>
                    <p className="text-brand-content">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold mb-4 text-brand-content">Síguenos en Redes Sociales</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/horneando_con_amor24/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-pink-500 text-white flex items-center justify-center hover:bg-brand-pink-600 transition hover:scale-110 shadow"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-brand-pink-500 text-white flex items-center justify-center hover:bg-brand-pink-600 transition hover:scale-110 shadow"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://wa.me/593986656631"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-pink-500 text-white flex items-center justify-center hover:bg-brand-pink-600 transition hover:scale-110 shadow"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
        
            <div className="p-8 bg-brand-box-3 border-t md:border-t-0 md:border-l border-brand-border">
              <h3 className="text-xl font-bold mb-6 text-brand-titulo-logo">Formulario de Contacto</h3>
              <form onSubmit={handleSubmit} className="space-y-4"> 
                <div>
                  <label className="block mb-2 font-medium text-brand-content">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-brand-box border border-brand-border rounded-lg px-4 py-3 text-brand-titulo-logo placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-brand-content">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-brand-box border border-brand-border rounded-lg px-4 py-3 text-brand-titulo-logo placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-brand-content">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full bg-brand-box border border-brand-border rounded-lg px-4 py-3 text-brand-titulo-logo placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-brand-content">Productos de tu interés</label>
                  <textarea
                    rows="4"
                    required
                    className="w-full bg-brand-box border border-brand-border rounded-lg px-4 py-3 text-brand-titulo-logo placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-pink-500 text-white font-bold py-3 rounded-lg hover:bg-brand-pink-600 transition hover:shadow-lg"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;