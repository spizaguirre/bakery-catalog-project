// src/components/EditarProducto.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId, actualizarProducto } from '../../firebase/config';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'tortas',
    ingredientes: '',
    destacado: false,
    nuevo: false,
    disponible: true,
    fotos: []
  });
  
  const [nuevasImagenes, setNuevasImagenes] = useState([]);
  const [vistaPrevia, setVistaPrevia] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [cargandoProducto, setCargandoProducto] = useState(true);

  // Función para cargar el producto
  const cargarProducto = async (productoId) => {
    try {
      const resultado = await obtenerProductoPorId(productoId);
      
      if (resultado.success) {
        const producto = resultado.producto;
        setFormData({
          nombre: producto.nombre || '',
          descripcion: producto.descripcion || '',
          precio: producto.precio || '',
          categoria: producto.categoria || 'tortas',
          ingredientes: producto.ingredientes ? producto.ingredientes.join(', ') : '',
          destacado: producto.destacado || false,
          nuevo: producto.nuevo || false,
          disponible: producto.disponible !== false,
          fotos: producto.fotos || []
        });
        
        // Mostrar imágenes existentes
        if (producto.fotos && producto.fotos.length > 0) {
          setVistaPrevia(producto.fotos.map(foto => foto.url));
        }
      } else {
        setMensaje({ tipo: 'error', texto: `Error: ${resultado.message}` });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `Error: ${error.message}` });
    } finally {
      setCargandoProducto(false);
    }
  };

  // Cargar producto cuando el componente se monta
  useEffect(() => {
    if (id) {
      cargarProducto(id);
    }
  }, [id]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar nuevas imágenes
  const handleNuevasImagenes = (e) => {
    const archivos = Array.from(e.target.files);
    setNuevasImagenes(prev => [...prev, ...archivos].slice(0, 10 - formData.fotos.length));
    
    archivos.forEach(archivo => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVistaPrevia(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(archivo);
    });
  };

  // Eliminar imagen existente
  const eliminarImagenExistente = (index) => {
    const nuevasFotos = formData.fotos.filter((_, i) => i !== index);
    const nuevasVistas = vistaPrevia.filter((_, i) => i !== index);
    
    setFormData(prev => ({ ...prev, fotos: nuevasFotos }));
    setVistaPrevia(nuevasVistas);
  };

  // Eliminar nueva imagen
  const eliminarNuevaImagen = (index) => {
    const nuevasImagenesArray = nuevasImagenes.filter((_, i) => i !== index);
    const nuevasVistas = vistaPrevia.filter((_, i) => i !== (index + formData.fotos.length));
    
    setNuevasImagenes(nuevasImagenesArray);
    setVistaPrevia(nuevasVistas);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.fotos.length + nuevasImagenes.length === 0) {
      setMensaje({ tipo: 'error', texto: 'Debes tener al menos una imagen' });
      return;
    }

    setSubiendo(true);
    setMensaje({ tipo: 'info', texto: 'Actualizando producto...' });

    try {
      const resultado = await actualizarProducto(id, formData, nuevasImagenes);
      
      if (resultado.success) {
        setMensaje({
          tipo: 'exito',
          texto: `✅ Producto "${formData.nombre}" actualizado exitosamente`
        });
        
        setTimeout(() => {
          navigate('/admin/productos');
        }, 2000);
      } else {
        setMensaje({ tipo: 'error', texto: `❌ Error: ${resultado.message}` });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `❌ Error: ${error.message}` });
    } finally {
      setSubiendo(false);
    }
  };

  if (cargandoProducto) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-pink-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/admin/productos')}
            className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center gap-2 w-fit"
          >
            <i className="fas fa-arrow-left"></i>
            Volver a productos
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Editar Producto
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Actualiza la información de "{formData.nombre}"
          </p>
        </div>

        {/* Mensajes */}
        {mensaje.texto && (
          <div className={`mb-6 p-4 rounded-lg ${
            mensaje.tipo === 'exito' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300'
              : mensaje.tipo === 'error'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300'
          }`}>
            <div className="flex items-start">
              <i className={`fas ${
                mensaje.tipo === 'exito' ? 'fa-check-circle text-green-500' :
                mensaje.tipo === 'error' ? 'fa-exclamation-triangle text-red-500' :
                'fa-info-circle text-blue-500'
              } mt-1 mr-3`}></i>
              <div className="whitespace-pre-line">{mensaje.texto}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre del producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                disabled={subiendo}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                disabled={subiendo}
              >
                <option value="tortas">Tortas</option>
                <option value="cupcakes">Cupcakes</option>
                <option value="galletas">Galletas</option>
                <option value="postres">Postres Especiales</option>
                <option value="personalizados">Pedidos Personalizados</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Precio (USD) *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                step="1"
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                disabled={subiendo}
              />
            </div>

            <div className="space-y-4 pt-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  className="w-5 h-5 text-brand-pink-500 rounded focus:ring-brand-pink-500"
                  disabled={subiendo}
                />
                <span className="text-gray-700 dark:text-gray-300">Producto destacado</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="nuevo"
                  checked={formData.nuevo}
                  onChange={handleChange}
                  className="w-5 h-5 text-brand-pink-500 rounded focus:ring-brand-pink-500"
                  disabled={subiendo}
                />
                <span className="text-gray-700 dark:text-gray-300">Marcar como nuevo</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="disponible"
                  checked={formData.disponible}
                  onChange={handleChange}
                  className="w-5 h-5 text-brand-pink-500 rounded focus:ring-brand-pink-500"
                  disabled={subiendo}
                />
                <span className="text-gray-700 dark:text-gray-300">Disponible</span>
              </label>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
              disabled={subiendo}
            />
          </div>

          {/* Ingredientes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ingredientes (opcional)
            </label>
            <input
              type="text"
              name="ingredientes"
              value={formData.ingredientes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
              placeholder="Separados por comas: chocolate, crema, frutas"
              disabled={subiendo}
            />
          </div>

          {/* Imágenes existentes */}
          {formData.fotos.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Imágenes existentes ({formData.fotos.length})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {formData.fotos.map((foto, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full pt-[75%] bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                      <img
                        src={foto.url}
                        alt={`Imagen ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarImagenExistente(index)}
                      disabled={subiendo}
                      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors disabled:opacity-50 shadow-lg"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2">
                      <span className="text-white text-xs font-medium">
                        {index === 0 ? '🌟 Portada' : `Foto ${index + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agregar nuevas imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Agregar nuevas imágenes (Máximo {10 - formData.fotos.length - nuevasImagenes.length} disponibles)
            </label>
            
            <div className={`border-3 border-dashed rounded-2xl p-8 text-center transition-colors ${subiendo
                ? 'border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800'
                : 'border-gray-300 dark:border-neutral-600 hover:border-brand-pink-400 bg-white dark:bg-neutral-800'
              }`}>
              <input
                type="file"
                id="nuevas-imagenes"
                multiple
                accept="image/*"
                onChange={handleNuevasImagenes}
                className="hidden"
                disabled={subiendo || (formData.fotos.length + nuevasImagenes.length) >= 10}
              />
              <label htmlFor="nuevas-imagenes" className={`cursor-pointer ${subiendo ? 'opacity-50' : ''}`}>
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-plus text-3xl text-blue-400 dark:text-blue-300"></i>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Agregar más fotos
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG o WebP. Total máximo: 10 imágenes
                </p>
              </label>
            </div>

            {/* Vista previa de nuevas imágenes */}
            {nuevasImagenes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Nuevas imágenes ({nuevasImagenes.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {vistaPrevia.slice(formData.fotos.length).map((src, index) => (
                    <div key={index} className="relative group">
                      <div className="relative w-full pt-[75%] bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                        <img
                          src={src}
                          alt={`Nueva imagen ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => eliminarNuevaImagen(index)}
                        disabled={subiendo}
                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors disabled:opacity-50 shadow-lg"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2">
                        <span className="text-white text-xs font-medium">
                          Nueva {index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/productos')}
              disabled={subiendo}
              className="px-6 py-3 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={subiendo}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {subiendo ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Actualizando...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarProducto;