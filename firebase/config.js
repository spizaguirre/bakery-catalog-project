// src/firebase/config.js - VERSIÓN COMPLETA CRUD
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy 
} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "bakeryproject-b147b.appspot.com",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ========== FUNCIONES DE IMÁGENES (CLOUDINARY) ==========
export const subirImagenCloudinary = async (archivo) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'deab06avk';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'bakery_products';
  
  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('upload_preset', uploadPreset);
  formData.append('cloud_name', cloudName);
  formData.append('folder', 'productos');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return {
      success: true,
      url: data.secure_url,
      public_id: data.public_id
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const subirMultiplesImagenes = async (archivos) => {
  const resultados = await Promise.all(
    archivos.map(async (archivo) => {
      const resultado = await subirImagenCloudinary(archivo);
      await new Promise(resolve => setTimeout(resolve, 300));
      return resultado;
    })
  );
  return resultados;
};

// ========== FUNCIONES CRUD DE PRODUCTOS ==========

// 1. CREAR producto
export const agregarProducto = async (productoData, imagenes) => {
  try {
    // Subir imágenes
    const resultadosImagenes = await subirMultiplesImagenes(imagenes);
    const imagenesExitosas = resultadosImagenes
      .filter(result => result.success)
      .map(result => ({
        url: result.url,
        public_id: result.public_id
      }));

    if (imagenesExitosas.length === 0) {
      throw new Error('No se pudieron subir las imágenes');
    }

    // Preparar datos
    const productoFirestore = {
      nombre: productoData.nombre.trim(),
      descripcion: productoData.descripcion.trim(),
      precio: parseFloat(productoData.precio),
      categoria: productoData.categoria,
      ingredientes: productoData.ingredientes 
        ? productoData.ingredientes.split(',').map(i => i.trim()).filter(i => i)
        : [],
      fotos: imagenesExitosas,
      destacado: productoData.destacado || false,
      nuevo: productoData.nuevo || false,
      disponible: productoData.disponible !== false,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };

    // Guardar
    const productosCollection = collection(db, 'productos');
    const docRef = await addDoc(productosCollection, productoFirestore);
    
    return {
      success: true,
      id: docRef.id,
      message: 'Producto creado exitosamente'
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// 2. LEER todos los productos
export const obtenerProductos = async () => {
  try {
    const productosCollection = collection(db, 'productos');
    const q = query(productosCollection, orderBy('fechaCreacion', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const productos = [];
    querySnapshot.forEach((doc) => {
      productos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return {
      success: true,
      productos: productos
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.message,
      productos: []
    };
  }
};

// 3. LEER un producto específico
export const obtenerProductoPorId = async (id) => {
  try {
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        producto: {
          id: docSnap.id,
          ...docSnap.data()
        }
      };
    } else {
      return {
        success: false,
        message: 'Producto no encontrado'
      };
    }
    
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// 4. ACTUALIZAR producto (manteniendo imágenes existentes o agregando nuevas)
export const actualizarProducto = async (id, productoData, nuevasImagenes = []) => {
  try {
    let fotosActualizadas = productoData.fotos || [];
    
    // Subir nuevas imágenes si las hay
    if (nuevasImagenes.length > 0) {
      const resultadosImagenes = await subirMultiplesImagenes(nuevasImagenes);
      const nuevasImagenesExitosas = resultadosImagenes
        .filter(result => result.success)
        .map(result => ({
          url: result.url,
          public_id: result.public_id
        }));
      
      fotosActualizadas = [...fotosActualizadas, ...nuevasImagenesExitosas];
    }

    // Preparar datos actualizados
    const productoActualizado = {
      nombre: productoData.nombre.trim(),
      descripcion: productoData.descripcion.trim(),
      precio: parseFloat(productoData.precio),
      categoria: productoData.categoria,
      ingredientes: productoData.ingredientes 
        ? productoData.ingredientes.split(',').map(i => i.trim()).filter(i => i)
        : [],
      fotos: fotosActualizadas,
      destacado: productoData.destacado || false,
      nuevo: productoData.nuevo || false,
      disponible: productoData.disponible !== false,
      fechaActualizacion: new Date().toISOString()
    };

    // Actualizar en Firestore
    const docRef = doc(db, 'productos', id);
    await updateDoc(docRef, productoActualizado);
    
    return {
      success: true,
      message: 'Producto actualizado exitosamente'
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// 5. ELIMINAR producto
export const eliminarProducto = async (id) => {
  try {
    const docRef = doc(db, 'productos', id);
    await deleteDoc(docRef);
    
    return {
      success: true,
      message: 'Producto eliminado exitosamente'
    };
    
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

// 6. ELIMINAR imagen específica de Cloudinary (opcional - requiere API key)
export const eliminarImagenCloudinary = async (publicId) => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY; // Necesitas agregar esto al .env
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET; // Necesitas agregar esto al .env
    
    if (!apiKey || !apiSecret) {
      console.warn('Cloudinary API key/secret no configurados. La imagen permanecerá en Cloudinary.');
      return { success: true, message: 'Imagen marcada para eliminación' };
    }
    
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await generarSignature(publicId, timestamp); // Necesitarías implementar esto
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_id: publicId,
          timestamp: timestamp,
          api_key: apiKey,
          signature: signature
        })
      }
    );
    
    const data = await response.json();
    
    if (data.result === 'ok') {
      return { success: true };
    } else {
      return { success: false, message: data.error.message };
    }
    
  } catch (error) {
    console.error('Error eliminando imagen de Cloudinary:', error);
    return { success: false, message: error.message };
  }
};