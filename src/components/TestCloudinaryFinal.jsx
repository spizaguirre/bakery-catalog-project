// src/components/TestCloudinaryFinal.jsx
import { useState } from 'react';

const TestCloudinaryFinal = () => {
  const [resultado, setResultado] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleFileSelect = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    
    setCargando(true);
    setResultado('Subiendo imagen...');
    
    try {
      // Importar dinámicamente para no afectar el bundle inicial
      const { subirImagenCloudinary } = await import("../../firebase/config");
      
      const resultado = await subirImagenCloudinary(archivo);
      
      if (resultado.success) {
        setImagenUrl(resultado.url);
        setResultado(`
✅ ¡IMAGEN SUBIDA EXITOSAMENTE!

📁 Preset: bakery_products
☁️ Cloud: deab06avk
📏 Tamaño: ${resultado.width}×${resultado.height}px
📦 Peso: ${Math.round(resultado.bytes / 1024)}KB
🔗 URL: ${resultado.url.substring(0, 60)}...

La imagen se guardó en:
📂 productos/${resultado.public_id}
        `);
      } else {
        setResultado(`❌ Error: ${resultado.message}`);
      }
    } catch (error) {
      setResultado(`❌ Error crítico: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-neutral-800 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">☁️ Prueba Final Cloudinary</h2>
      
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm">
          <strong>Configuración activa:</strong>
        </p>
        <div className="text-xs mt-2 space-y-1">
          <div>✅ <code>VITE_CLOUDINARY_CLOUD_NAME=deab06avk</code></div>
          <div>✅ <code>VITE_CLOUDINARY_UPLOAD_PRESET=bakery_products</code></div>
          <div>✅ <strong>Transformaciones aplicadas:</strong> 800×600px, calidad automática</div>
        </div>
      </div>
      
      {/* Selector de archivos */}
      <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-xl p-8 text-center mb-6">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={cargando}
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-cloud-upload-alt text-2xl text-blue-500"></i>
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {cargando ? 'Subiendo...' : 'Haz click para subir una imagen'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            PNG, JPG, WebP. Se optimizará automáticamente a 800×600px
          </p>
        </label>
      </div>
      
      {/* Resultados */}
      {resultado && (
        <div className={`p-4 rounded-lg whitespace-pre-line mb-6 ${
          resultado.includes('✅') 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
        }`}>
          {resultado}
        </div>
      )}
      
      {/* Imagen subida */}
      {imagenUrl && (
        <div className="mt-6">
          <h3 className="font-bold mb-3">📸 Vista previa:</h3>
          <div className="relative">
            <img
              src={imagenUrl}
              alt="Imagen subida a Cloudinary"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 rounded-b-lg">
              Imagen optimizada por Cloudinary
            </div>
          </div>
          <div className="mt-3 flex justify-center space-x-3">
            <a
              href={imagenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
            >
              <i className="fas fa-external-link-alt mr-2"></i>Abrir original
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(imagenUrl)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600"
            >
              <i className="fas fa-copy mr-2"></i>Copiar URL
            </button>
          </div>
        </div>
      )}
      
      {/* Estado */}
      {cargando && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Subiendo y optimizando imagen...
          </p>
        </div>
      )}
    </div>
  );
};

export default TestCloudinaryFinal;