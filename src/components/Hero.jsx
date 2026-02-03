const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-gradient text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Dulces Momentos Hechos con Amor
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-95 px-2">
            Descubre nuestra repostería artesanal, donde cada postre es una obra de arte creada con ingredientes premium y mucha pasión.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => scrollToSection('products')}
              className="bg-white text-brand-pink-600 font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-neutral-100 transition shadow-lg text-sm sm:text-base"
            >
              <i className="fas fa-eye mr-2"></i>Ver Productos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border-2 border-white text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-white/10 transition text-sm sm:text-base"
            >
              <i className="fas fa-calendar-check mr-2"></i>Hacer Pedido
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero