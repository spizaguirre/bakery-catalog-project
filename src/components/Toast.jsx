import { useState, useEffect } from 'react';

const Toast = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para mostrar el toast automáticamente después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed right-5 bottom-20 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white border border-pink-100 rounded-2xl shadow-2xl dark:text-gray-400 dark:bg-neutral-800 z-50 animate-bounce-short"
      role="alert"
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            ¡Suscríbete ahora! 🧁
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="text-sm font-normal mb-3">
          Recibe correos con nuevos productos y promociones exclusivas.
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setIsVisible(false)}
            className="px-2 py-1.5 text-xs font-medium text-white bg-brand-pink-500 rounded-lg hover:bg-brand-pink-600 transition"
          >
            Sí, quiero
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="px-2 py-1.5 text-xs font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:border-neutral-600 transition"
          >
            No ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;