const About = () => {
  const values = [
    'Calidad premium en cada producto',
    'Ingredientes frescos y naturales',
    'Personalización para cada ocasión',
    'Compromiso con la satisfacción del cliente',
  ]

  return (
    <section id="about" className="py-12 sm:py-16 section-gradient-2">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-subtitles-2 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-brand-content mb-3 sm:mb-4 text-sm sm:text-base">
              Horneando con Amor nació de la pasión por crear postres que no solo sean deliciosos, sino que también lleven consigo un toque especial de amor y dedicación.
            </p>
            <p className="text-brand-content mb-3 sm:mb-4 text-sm sm:text-base">
              Comenzamos como un pequeño emprendimiento familiar y hoy nos enorgullece servir a nuestra comunidad con productos de la más alta calidad, elaborados con ingredientes frescos y naturales.
            </p>
            <p className="text-brand-content text-sm sm:text-base">
              Cada pedido es tratado con especial cuidado, asegurando que recibas no solo un producto excepcional, sino una experiencia memorable.
            </p>
          </div>
          <div className="lg:w-1/2 lg:pl-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-brand-subtitles-2">
              Nuestros Valores
            </h3>
            <ul className="space-y-3">
              {values.map((value, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3 text-brand-ckeck"></i>
                  <span className="text-brand-content text-sm sm:text-base">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About