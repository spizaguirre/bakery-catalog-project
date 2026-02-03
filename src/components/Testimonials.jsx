const Testimonials = () => {
  const testimonials = [
    {
      name: 'María González',
      initial: 'M',
      rating: 5,
      text: '"La torta para el cumpleaños de mi hija fue increíble. No solo era hermosa, sino que sabía deliciosa. Todos mis invitados preguntaron por el contacto."',
    },
    {
      name: 'Carlos Rodríguez',
      initial: 'C',
      rating: 5,
      text: '"Pedí cupcakes para mi oficina y fueron un éxito total. La presentación era impecable y el sabor espectacular. Definitivamente repetiré."',
    },
    {
      name: 'Ana Martínez',
      initial: 'A',
      rating: 4.5,
      text: '"Las galletas personalizadas para el baby shower fueron adorables. El diseño era exactamente lo que quería y el sabor era delicioso. Muy recomendable."',
    },
  ]

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }

    return stars
  }

  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-pink-50 dark:bg-neutral-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-contrast mb-3 sm:mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
            Experiencias reales de quienes han disfrutado de nuestros productos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-brand-box p-5 sm:p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-ckeck-2 flex items-center justify-center text-brand-subtitles font-bold mr-3 sm:mr-4">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-bold text-brand-subtitles text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <div className="flex text-yellow-400 text-sm">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="text-brand-content text-sm sm:text-base">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials