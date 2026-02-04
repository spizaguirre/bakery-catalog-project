// src/components/Products.jsx - VERSIÓN CORREGIDA
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  const categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'tortas', nombre: 'Tortas' },
    { id: 'cupcakes', nombre: 'Cupcakes' },
    { id: 'galletas', nombre: 'Galletas' },
    { id: 'postres', nombre: 'Postres' },
  ];

  // Cargar productos de Firebase
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const productosRef = collection(db, 'productos');
        const q = query(productosRef, orderBy('fechaCreacion', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const productosData = [];
        querySnapshot.forEach((doc) => {
          productosData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setProductos(productosData);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Filtrar productos por categoría
  const productosFiltrados = categoriaActiva === 'todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActiva);

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4">
            Nuestros <span className="text-brand-pink-500">Productos</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Cada creación es única, hecha con los mejores ingredientes y mucho amor
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map(categoria => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActiva(categoria.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                categoriaActiva === categoria.id
                  ? 'bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white shadow-lg'
                  : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-neutral-700'
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>

        {/* Galería de productos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink-500"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">Cargando productos...</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg">
            <i className="fas fa-cookie-bite text-gray-300 dark:text-neutral-700 text-5xl mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              No hay productos aún
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Pronto agregaremos nuestras delicias
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map(producto => (
              <div 
                key={producto.id} 
                className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
              >
                {/* Imagen del producto - CON PROPORCIÓN FIJA */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-neutral-700">
                  {/* Contenedor con relación de aspecto 4:3 */}
                  <div className="relative w-full pt-[75%]">
                    {producto.fotos && producto.fotos.length > 0 ? (
                      <img
                        src={producto.fotos[0]?.url || '/placeholder.jpg'}
                        alt={producto.nombre}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className="fas fa-cake text-gray-300 dark:text-neutral-600 text-4xl"></i>
                      </div>
                    )}
                  </div>
                  
                  {/* Badges - POSICIONADOS SOBRE LA IMAGEN */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
                    {producto.destacado && (
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        <i className="fas fa-star mr-1"></i> Destacado
                      </div>
                    )}
                    {producto.nuevo && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Nuevo
                      </div>
                    )}
                  </div>
                </div>

                {/* Información del producto */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white line-clamp-1">
                      {producto.nombre}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 rounded-full whitespace-nowrap">
                      {producto.categoria}
                    </span>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {producto.descripcion || 'Delicioso producto artesanal'}
                  </p>

                  {/* Precio y botón */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-neutral-700">
                    <div>
                      <span className="text-2xl font-bold text-brand-pink-500">
                        ${producto.precio?.toLocaleString() || '0'}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        CLP
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Aquí puedes agregar lógica para pedir el producto
                        console.log('Pedir:', producto.id);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all hover:scale-105"
                    >
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Pedir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botón para agregar más productos (solo visible si estás logueado) */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            ¿Quieres ver algo especial? <span className="text-brand-pink-500 font-medium">¡Contáctanos!</span>
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white rounded-full font-medium hover:shadow-xl transition-all"
          >
            <i className="fas fa-envelope mr-2"></i>
            Solicitar Pedido Personalizado
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;