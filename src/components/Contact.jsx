const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Mensaje enviado. ¡Gracias por contactarnos!');
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-pink-500 dark:text-brand-pink-300">Haz Tu Pedido</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Contáctanos para consultas, cotizaciones y pedidos personalizados
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-pink-100 to-white dark:from-neutral-700 dark:to-neutral-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-neutral-600">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-phone mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Teléfono</h4>
                    <p className="text-gray-600 dark:text-gray-400">+593 986656631</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">pedidos@dulcetentacion.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Dirección</h4>
                    <p className="text-gray-600 dark:text-gray-400">Guayaquil, Ecuador</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-clock mt-1 mr-4 text-brand-pink-500"></i>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">Horario de Atención</h4>
                    <p className="text-gray-600 dark:text-gray-400">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold mb-4 text-gray-800 dark:text-white">Síguenos en Redes Sociales</h4>
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

            <div className="p-8 bg-white dark:bg-neutral-700 border-t md:border-t-0 md:border-l border-gray-200 dark:border-neutral-600">
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Formulario de Contacto</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-gray-50 dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-50 dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-50 dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Mensaje</label>
                  <textarea
                    rows="4"
                    required
                    className="w-full bg-gray-50 dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent transition"
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