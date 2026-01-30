const Features = () => {
  const features = [
    { title: "Hecho con Amor", icon: "fa-heart", desc: "Elaborado artesanalmente con ingredientes frescos." },
    { title: "Entrega Rápida", icon: "fa-bolt", desc: "Preparamos y entregamos manteniendo la frescura." },
    { title: "Personalizable", icon: "fa-palette", desc: "Adaptamos nuestros productos a tus necesidades." }
  ];

  return (
    <section className="py-16 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-white">¿Por Qué Elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 text-center border border-neutral-200 dark:border-neutral-600 hover:shadow-lg transition">
              <div className="w-16 h-16 rounded-full bg-brand-pink-100 dark:bg-brand-pink-900 text-brand-pink-500 flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${f.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{f.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;