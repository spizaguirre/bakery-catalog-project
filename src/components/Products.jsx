import { useState } from 'react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products = [
    {
      id: 1,
      name: 'Torta Mojada de Chocolate',
      category: 'tortas',
      price: '$20.00',
      description: 'Deliciosa torta de chocolate con relleno cremoso y decoración personalizada.',
      rating: 4.9,
      reviews: 128,
      image: 'https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/05b9ae1f5302940549596ce7d2d0c240.webp?itok=RgMf1CGw',
      recipeUrl: 'https://www.recetasnestle.com.ec/recetas/torta-mojada-de-chocolate'
    },
    {
      id: 2,
      name: 'Cupcakes Decorados',
      category: 'bocadillos',
      price: '$4.00 c/u',
      description: 'Esponjosos cupcakes con diferentes sabores y decoraciones creativas.',
      rating: 4.8,
      reviews: 95,
      image: 'https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/c03eaa6fb1374a728eff0bfaa3199d79.webp?itok=iEO-0YJv',
      recipeUrl: 'https://www.recetasnestle.com.ec/recetas/cupcakes-dalmata'
    },
    {
      id: 3,
      name: 'Galletas ChocoChips',
      category: 'bocadillos',
      price: '$4 c/u',
      description: 'Galletas decoradas a mano con diseños únicos para tus eventos especiales.',
      rating: 4.9,
      reviews: 142,
      image: 'https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/b7a900990bb621daf3eca0752622d9e5.webp?itok=pLjzLs9n',
      recipeUrl: 'https://www.recetasnestle.com.ec/recetas/galletas-chocochips'
    },
    {
      id: 4,
      name: 'Brownies y Blondies',
      category: 'bocadillos',
      price: '$1 c/u',
      description: 'Cuadrados de chocolate (o vainilla) húmedos y suaves, con nueces o chips de chocolate.',
      rating: 4.9,
      reviews: 150,
      image: 'https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/86e69e02d7e2e518415d0e07b5b10d0a.webp?itok=u9B0PEIL',
      recipeUrl: 'https://www.recetasnestle.com.ec/recetas/brownies-de-chocolate'
    },
    {
      id: 5,
      name: 'Chessecake de Maracuyá',
      category: 'postres',
      price: '$1 c/u',
      description: 'Suave y cremoso pastel de queso con una capa fresca de maracuyá natural.',
      rating: 4.6,
      reviews: 110,
      image: 'https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/b9e5673058f8bcc1d7853f5b20110db5.webp?itok=Ew-CiB1R',
      recipeUrl: 'https://www.recetasnestle.com.ec/recetas/cheesecake-de-maracuya'
    },
    {
      id: 6,
      name: 'Brazo Gitano',
      category: 'postres',
      price: '$1 c/u',
      description: 'Bizcocho enrollado con relleno de frutas, crema pastelera o chocolate.',
      rating: 4.7,
      reviews: 120,
      image: 'https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/e6fab8b557a1aed40840e4509966f0d9.webp?itok=pMU6HQrn',
      recipeUrl: 'https://www.recetasnestle.com.ec/recetas/brazo-gitano-bajo-en-azucar'
    }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="products" className="py-12 sm:py-16 section-gradient">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-contrast mb-3 sm:mb-4">
            Nuestros Productos
          </h2>
          <p className="max-w-2xl mx-auto text-brand-content text-sm sm:text-base">
            Descubre nuestra variedad de postres y tortas artesanales
          </p>
        </div>

        {/* Filtro responsive */}
        <div className="container mx-auto mb-6 sm:mb-10">
          <div className="max-w-4xl mx-auto mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-brand-subtitles">
              Filtrar por Categoría
            </h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 py-2.5 sm:py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink-400 text-sm sm:text-base"
            >
              <option value="all">Todos los productos</option>
              <option value="tortas">Tortas</option>
              <option value="postres">Postres</option>
              <option value="bocadillos">Bocadillos</option>
            </select>
          </div>
        </div>

        {/* Grid de productos responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-t-xl"
                />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-brand-pink-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold shadow">
                  {product.price}
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-base sm:text-lg mb-2 text-neutral-800 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 text-sm sm:text-base">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <i className="fas fa-star text-accent-500 mr-1 text-sm sm:text-base"></i>
                    <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <a
                    href={product.recipeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold hover:shadow transition inline-block text-center"
                  >
                    Receta
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-flex items-center text-sm sm:text-base"
          >
            <i className="fas fa-list mr-2"></i>Haz tu pedido
          </button>
        </div>
      </div>
    </section>
  )
}

export default Products