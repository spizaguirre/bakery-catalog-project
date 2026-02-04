// src/components/ProductosAdmin.jsx
import { useState, useEffect } from 'react';
import {
  obtenerProductos,
  eliminarProducto,
  obtenerProductoPorId
} from '../../firebase/config';

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Cargar productos
  const cargarProductos = async () => {
    try {
      setLoading(true);
      const resultado = await obtenerProductos();

      if (resultado.success) {
        setProductos(resultado.productos);
      } else {
        setMensaje({ tipo: 'error', texto: `Error: ${resultado.message}` });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Filtrar productos por búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para eliminar producto
  const confirmarEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarConfirmacion(true);
  };

  const ejecutarEliminar = async () => {
    if (!productoAEliminar) return;

    try {
      const resultado = await eliminarProducto(productoAEliminar.id);

      if (resultado.success) {
        setMensaje({ tipo: 'exito', texto: `"${productoAEliminar.nombre}" eliminado exitosamente` });
        cargarProductos(); // Recargar lista
      } else {
        setMensaje({ tipo: 'error', texto: ` Error: ${resultado.message}` });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: ` Error: ${error.message}` });
    } finally {
      setMostrarConfirmacion(false);
      setProductoAEliminar(null);
    }
  };

  // Formatear precio
  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')} USD`;
  };

  // Formatear fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Gestión de Productos
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestiona todos los productos de tu catálogo
          </p>

          {/* Botones de acción */}
          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href="/admin/nuevo"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Nuevo Producto
            </a>

            <button
              onClick={cargarProductos}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <i className="fas fa-sync-alt"></i>
              Actualizar
            </button>

            <span className="text-sm text-gray-500 dark:text-gray-400 self-center ml-2">
              {productos.length} productos en total
            </span>
          </div>
        </div>

        {/* Mensajes */}
        {mensaje.texto && (
          <div className={`mb-6 p-4 rounded-lg ${mensaje.tipo === 'exito'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
            }`}>
            {mensaje.texto}
          </div>
        )}

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Buscar productos por nombre, categoría o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
            />
          </div>
        </div>

        {/* Tabla de productos */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando productos...</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl">
            <i className="fas fa-box-open text-gray-300 dark:text-neutral-600 text-5xl mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              {busqueda ? 'No se encontraron productos' : 'No hay productos aún'}
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              {busqueda ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando tu primer producto'}
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {productosFiltrados.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {producto.fotos && producto.fotos[0] ? (
                              <img
                                src={producto.fotos[0].url}
                                alt={producto.nombre}
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded bg-gray-200 dark:bg-neutral-600 flex items-center justify-center">
                                <i className="fas fa-cake text-gray-400"></i>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {producto.nombre}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">
                              {producto.descripcion.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {producto.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">
                        {formatearPrecio(producto.precio)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          {producto.destacado && (
                            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                              <i className="fas fa-star mr-1"></i> Destacado
                            </span>
                          )}
                          {producto.nuevo && (
                            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              <i className="fas fa-certificate mr-1"></i> Nuevo
                            </span>
                          )}
                          {!producto.disponible && (
                            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                              <i className="fas fa-times mr-1"></i> No disponible
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatearFecha(producto.fechaCreacion)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.location.href = `/admin/editar/${producto.id}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => confirmarEliminar(producto)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button
                            onClick={() => window.open(`/producto/${producto.id}`, '_blank')}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Ver"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal de confirmación para eliminar */}
        {mostrarConfirmacion && productoAEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Confirmar eliminación
              </h3>

              <div className="mb-6">
                <div className="flex items-center mb-3">
                  {productoAEliminar.fotos && productoAEliminar.fotos[0] && (
                    <img
                      src={productoAEliminar.fotos[0].url}
                      alt={productoAEliminar.nombre}
                      className="h-12 w-12 rounded object-cover mr-3"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {productoAEliminar.nombre}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatearPrecio(productoAEliminar.precio)} • {productoAEliminar.categoria}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setMostrarConfirmacion(false);
                    setProductoAEliminar(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={ejecutarEliminar}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
                >
                  <i className="fas fa-trash"></i>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default ProductosAdmin;