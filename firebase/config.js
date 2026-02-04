// src/firebase/config.js - VERSIÓN COMPLETA CON LOGS
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

console.log(' [config.js] Inicializando Firebase...');
console.log(' [config.js] Project ID:', firebaseConfig.projectId);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🟢 [config.js] Firebase inicializado correctamente');

// Función para subir una imagen a Cloudinary
export const subirImagenCloudinary = async (archivo) => {
  console.log(' [subirImagenCloudinary] INICIANDO');
  console.log(' Archivo:', archivo.name, 'Tamaño:', Math.round(archivo.size/1024) + 'KB', 'Tipo:', archivo.type);
  
  // Usar valores del .env o valores directos de respaldo
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'deab06avk';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'bakery_products';
  
  console.log(' [subirImagenCloudinary] Cloud Name:', cloudName);
  console.log(' [subirImagenCloudinary] Upload Preset:', uploadPreset);
  
  if (!cloudName || cloudName === 'undefined') {
    const errorMsg = ' VITE_CLOUDINARY_CLOUD_NAME no está configurado';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  
  if (!uploadPreset || uploadPreset === 'undefined') {
    const errorMsg = ' VITE_CLOUDINARY_UPLOAD_PRESET no está configurado';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);
  formData.append('folder', 'productos');

  try {
    console.log(' [subirImagenCloudinary] Enviando a Cloudinary...');
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log(' URL:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log(' [subirImagenCloudinary] Status:', response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(' [subirImagenCloudinary] Error response:', errorText.substring(0, 200));
      throw new Error(`Cloudinary error ${response.status}: ${errorText.substring(0, 100)}`);
    }

    const data = await response.json();
    console.log(' [subirImagenCloudinary] ÉXITO');
    console.log(' URL obtenida:', data.secure_url ? 'SÍ' : 'NO');
    console.log(' Public ID:', data.public_id);
    
    return {
      success: true,
      url: data.secure_url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes
    };
    
  } catch (error) {
    console.error(' [subirImagenCloudinary] ERROR:', error.message);
    return {
      success: false,
      message: `Error subiendo imagen: ${error.message}`
    };
  }
};

// Función para subir múltiples imágenes
export const subirMultiplesImagenes = async (archivos) => {
  console.log(' [subirMultiplesImagenes] INICIANDO');
  console.log(' Número de archivos:', archivos.length);
  
  const resultados = [];
  
  // Subir una por una (no usar Promise.all para mejor control)
  for (let i = 0; i < archivos.length; i++) {
    const archivo = archivos[i];
    console.log(` [subirMultiplesImagenes] Subiendo imagen ${i + 1}/${archivos.length}: ${archivo.name}`);
    
    const resultado = await subirImagenCloudinary(archivo);
    resultados.push(resultado);
    
    console.log(` [subirMultiplesImagenes] Resultado ${i + 1}:`, resultado.success ? '✅' : '❌', resultado.message || '');
    
    // Pequeña pausa entre uploads (opcional)
    if (i < archivos.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  console.log(' [subirMultiplesImagenes] COMPLETADO');
  console.log(' Resultados totales:', resultados.filter(r => r.success).length, 'de', archivos.length, 'éxitos');
  
  return resultados;
};

// Función principal para agregar producto
export const agregarProducto = async (productoData, imagenes) => {
  console.log(' [agregarProducto] ===== INICIANDO =====');
  console.log(' Datos del producto:', {
    nombre: productoData.nombre,
    precio: productoData.precio,
    categoria: productoData.categoria,
    destacado: productoData.destacado,
    nuevo: productoData.nuevo
  });
  console.log(' Número de imágenes:', imagenes.length);
  
  try {
    // ===== 1. SUBIR IMÁGENES =====
    console.log(' [agregarProducto] Paso 1: Subiendo imágenes...');
    const resultadosImagenes = await subirMultiplesImagenes(imagenes);
    
    // Filtrar solo las exitosas
    const imagenesExitosas = resultadosImagenes
      .filter(result => result.success)
      .map(result => ({
        url: result.url,
        public_id: result.public_id
      }));
    
    console.log(' [agregarProducto] Imágenes exitosas:', imagenesExitosas.length, 'de', imagenes.length);
    
    if (imagenesExitosas.length === 0) {
      const errorMsg = 'No se pudieron subir las imágenes. Todas fallaron.';
      console.error(' [agregarProducto]', errorMsg);
      throw new Error(errorMsg);
    }
    
    // ===== 2. PREPARAR DATOS FIRESTORE =====
    console.log(' [agregarProducto] Paso 2: Preparando datos para Firestore...');
    
    const productoFirestore = {
      nombre: productoData.nombre.trim(),
      descripcion: productoData.descripcion.trim(),
      precio: parseFloat(productoData.precio) || 0,
      categoria: productoData.categoria,
      ingredientes: productoData.ingredientes 
        ? productoData.ingredientes.split(',').map(i => i.trim()).filter(i => i)
        : [],
      fotos: imagenesExitosas,
      destacado: productoData.destacado || false,
      nuevo: productoData.nuevo || false,
      disponible: productoData.disponible !== false,
      fechaCreacion: new Date().toISOString(),
      timestamp: new Date().getTime()
    };
    
    console.log(' [agregarProducto] Datos Firestore:', {
      nombre: productoFirestore.nombre,
      precio: productoFirestore.precio,
      fotos: productoFirestore.fotos.length,
      fecha: productoFirestore.fechaCreacion
    });
    
    // ===== 3. GUARDAR EN FIRESTORE =====
    console.log(' [agregarProducto] Paso 3: Guardando en Firestore...');
    
    const productosCollection = collection(db, 'productos');
    console.log(' [agregarProducto] Colección:', 'productos');
    
    const docRef = await addDoc(productosCollection, productoFirestore);
    
    console.log(' [agregarProducto] ===== ÉXITO COMPLETO =====');
    console.log(' ID del documento:', docRef.id);
    console.log(' Imágenes subidas:', imagenesExitosas.length);
    console.log(' Producto:', productoFirestore.nombre);
    
    return {
      success: true,
      id: docRef.id,
      imagenes: imagenesExitosas.length,
      message: ` Producto "${productoFirestore.nombre}" publicado exitosamente con ${imagenesExitosas.length} imágenes`
    };
    
  } catch (error) {
    console.error(' [agregarProducto] ===== ERROR =====');
    console.error(' Detalles del error:', error.message);
    console.error(' Stack trace:', error.stack);
    
    return {
      success: false,
      message: ` Error: ${error.message}`
    };
  }
};

// Función para obtener URL optimizada (opcional)
export const obtenerUrlOptimizada = (publicId, options = {}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'deab06avk';
  const {
    width = 800,
    height = 600,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;
  
  const transformations = `c_${crop},w_${width},h_${height},q_${quality},f_${format}`;
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};

// Exportar db para otros componentes
export { db };

// Función de prueba para verificar conexión
export const testConnection = async () => {
  console.log('🔵 [testConnection] Probando conexiones...');
  
  // Test Cloudinary
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  console.log(' Cloudinary config:', { cloudName, uploadPreset });
  
  // Test Firebase
  console.log(' Firebase config:', { 
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  });
  
  return {
    cloudinary: { cloudName, uploadPreset },
    firebase: { projectId: firebaseConfig.projectId }
  };
};

console.log(' [config.js] Módulo cargado correctamente');