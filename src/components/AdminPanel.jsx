// src/components/AdminPanel.jsx - CORRECCIÓN
import { useState, useEffect } from 'react'; // <-- Importar useEffect
import { agregarProducto } from '../../firebase/config';

const AdminPanel = () => {
  // Agrega esto DENTRO del componente
  // En AdminPanel.jsx - al inicio del componente
useEffect(() => {
  console.log('=== CONFIGURACIÓN CLOUDINARY ===');
  console.log('Cloud Name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  console.log('Upload Preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  console.log('Firebase API Key (primeros chars):', import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10));
}, []);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'tortas',
    ingredientes: '',
    destacado: false,
    nuevo: false,
    disponible: true
  });

  const [imagenes, setImagenes] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [vistaPrevia, setVistaPrevia] = useState([]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar selección de imágenes
  const handleImagenesChange = (e) => {
    const archivos = Array.from(e.target.files);
    const nuevasImagenes = [...imagenes, ...archivos].slice(0, 10);

    setImagenes(nuevasImagenes);

    // Crear vistas previas
    const nuevasVistasPrevias = [];
    nuevasImagenes.forEach(archivo => {
      const reader = new FileReader();
      reader.onload = (e) => {
        nuevasVistasPrevias.push(e.target.result);
        if (nuevasVistasPrevias.length === nuevasImagenes.length) {
          setVistaPrevia(nuevasVistasPrevias);
        }
      };
      reader.readAsDataURL(archivo);
    });
  };

  // Eliminar imagen
  const eliminarImagen = (index) => {
    const nuevasImagenes = imagenes.filter((_, i) => i !== index);
    const nuevasVistas = vistaPrevia.filter((_, i) => i !== index);
    setImagenes(nuevasImagenes);
    setVistaPrevia(nuevasVistas);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imagenes.length === 0) {
      setMensaje({ tipo: 'error', texto: 'Debes subir al menos una imagen del producto' });
      return;
    }

    setSubiendo(true);
    setMensaje({ tipo: 'info', texto: 'Subiendo imágenes y guardando producto...' });

    try {
      const resultado = await agregarProducto(formData, imagenes);

      if (resultado.success) {
        setMensaje({
          tipo: 'exito',
          texto: ` ¡Producto "${formData.nombre}" publicado exitosamente!\n\nID: ${resultado.id}\nImágenes subidas: ${resultado.imagenes || imagenes.length}`
        });

        // Resetear formulario
        setFormData({
          nombre: '',
          descripcion: '',
          precio: '',
          categoria: 'tortas',
          ingredientes: '',
          destacado: false,
          nuevo: false,
          disponible: true
        });
        setImagenes([]);
        setVistaPrevia([]);
      } else {
        setMensaje({ tipo: 'error', texto: ` Error: ${resultado.message}` });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: ` Error crítico: ${error.message}` });
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 rounded-full mb-4">
            <i className="fas fa-utensils text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Agrega nuevos productos a tu catálogo
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>Imágenes se suben a Cloudinary automáticamente</span>
          </div>
        </div>

        {/* Mensajes */}
        {mensaje.texto && (
          <div className={`mb-6 p-4 rounded-lg ${mensaje.tipo === 'exito'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300'
              : mensaje.tipo === 'error'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300'
            }`}>
            <div className="flex items-start">
              <i className={`fas ${mensaje.tipo === 'exito' ? 'fa-check-circle text-green-500' :
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
                placeholder="Ej: Torta de Chocolate Triple"
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
                placeholder="20.00"
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
              placeholder="Describe tu producto de manera atractiva..."
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Ej: Chocolate 70%, Crema fresca, Frambuesas
            </p>
          </div>

          {/* Subida de imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Fotos del producto * (Máximo 10)
            </label>

            {/* Zona de arrastrar y soltar */}
            <div className={`border-3 border-dashed rounded-2xl p-8 text-center transition-colors ${subiendo
                ? 'border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800'
                : 'border-gray-300 dark:border-neutral-600 hover:border-brand-pink-400 bg-white dark:bg-neutral-800'
              }`}>
              <input
                type="file"
                id="imagenes-upload"
                multiple
                accept="image/*"
                onChange={handleImagenesChange}
                className="hidden"
                disabled={subiendo || imagenes.length >= 10}
              />
              <label htmlFor="imagenes-upload" className={`cursor-pointer ${subiendo ? 'opacity-50' : ''}`}>
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-cloud-upload-alt text-3xl text-blue-400 dark:text-blue-300"></i>
                </div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {imagenes.length === 0
                    ? 'Arrastra o haz click para subir fotos'
                    : `Agregar más fotos (${10 - imagenes.length} disponibles)`
                  }
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG o WebP. Recomendado: 800×600px
                </p>
                {imagenes.length > 0 && (
                  <p className="text-xs text-brand-pink-500 dark:text-brand-pink-400 mt-2">
                    {imagenes.length} {imagenes.length === 1 ? 'imagen seleccionada' : 'imágenes seleccionadas'}
                  </p>
                )}
              </label>
            </div>

            {/* Vista previa */}
            {vistaPrevia.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Vista previa
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {vistaPrevia.map((src, index) => (
                    <div key={index} className="relative group">
                      {/* Contenedor con relación de aspecto 4:3 (800x600 = 4:3) */}
                      <div className="relative w-full pt-[75%] bg-gray-100 dark:bg-neutral-700 rounded-lg overflow-hidden">
                        <img
                          src={src}
                          alt={`Vista previa ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => eliminarImagen(index)}
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

            {/* Botón de enviar */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={subiendo || imagenes.length === 0}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {subiendo ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Subiendo producto...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt mr-2"></i>
                    Publicar Producto
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                * Campos obligatorios. Las imágenes se optimizarán automáticamente.
              </p>
            </div>
            </div>
        </form>



        {/* Información de ayuda */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <i className="fas fa-question-circle text-blue-500 mr-2"></i>
            ¿Cómo subir productos?
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Completa toda la información del producto</li>
            <li>Selecciona al menos una foto (máximo 10)</li>
            <li>Haz clic en "Publicar Producto"</li>
            <li>Las imágenes se subirán automáticamente a Cloudinary</li>
            <li>Los datos se guardarán en Firebase</li>
            <li>El producto aparecerá inmediatamente en tu sitio web</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;