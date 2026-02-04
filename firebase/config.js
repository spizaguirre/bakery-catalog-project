// src/firebase/config.js - VERSIÓN FINAL
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Cloudinary upload function WITH TRANSFORMATIONS
export const subirImagenCloudinary = async (archivo) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // 'deab06avk'
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // 'bakery_products'
  
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary no configurado en .env');
  }

  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);
  
  // TRANSFORMACIONES DIRECTAS EN EL ENDPOINT
  const transformations = [
    'c_fill',      // Crop fill
    'w_800',       // Width 800px
    'h_600',       // Height 600px
    'g_auto',      // Gravity auto
    'q_auto:good', // Auto quality good
    'f_auto'       // Auto format (webp, jpg, etc)
  ].join(',');
  
  // Agregar transformaciones como parámetro
  formData.append('transformation', transformations);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      url: data.secure_url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      bytes: data.bytes,
      created_at: data.created_at
    };
    
  } catch (error) {
    console.error('❌ Error subiendo a Cloudinary:', error);
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
};

// Función para subir múltiples imágenes
export const subirMultiplesImagenes = async (archivos) => {
  const resultados = await Promise.all(
    archivos.map(async (archivo) => {
      const resultado = await subirImagenCloudinary(archivo);
      // Pequeña pausa entre uploads
      await new Promise(resolve => setTimeout(resolve, 500));
      return resultado;
    })
  );
  
  return resultados;
};

// Función para obtener URL con diferentes tamaños
export const obtenerUrlOptimizada = (publicId, options = {}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
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