const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Dulces Momentos Hechos con Amor</h1>
          <p className="text-xl mb-8 opacity-95">
            Descubre nuestra repostería artesanal, donde cada postre es una obra de arte creada con ingredientes premium y mucha pasión.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#products" className="bg-white text-brand-pink-600 font-bold py-3 px-8 rounded-full hover:bg-neutral-100 transition shadow-lg">
              Ver Productos
            </a>
            <a href="#contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition">
              Hacer Pedido
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;