const Features = () => {
  const features = [
    {
      icon: 'fa-heart',
      title: 'Hecho con Amor',
      description: 'Cada producto es elaborado artesanalmente con ingredientes frescos y de la más alta calidad.',
    },
    {
      icon: 'fa-bolt',
      title: 'Entrega Rápida',
      description: 'Preparamos y entregamos tus pedidos en el menor tiempo posible, manteniendo siempre la frescura.',
    },
    {
      icon: 'fa-palette',
      title: 'Personalizable',
      description: 'Adaptamos nuestros productos a tus necesidades y preferencias para ocasiones especiales.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 section-gradient-4">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-brand-titulo-logo mb-8 sm:mb-12">
          ¿Por Qué Elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-brand-box-2 rounded-xl p-5 sm:p-6 hover:shadow-lg transition text-center border border-brand-border"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-ckeck-3 text-brand-pink-500 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md">
                <i className={`fas ${feature.icon} text-xl sm:text-2xl`}></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-brand-titulo-logo">
                {feature.title}
              </h3>
              <p className="text-brand-content text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;