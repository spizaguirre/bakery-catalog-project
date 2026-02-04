// src/services/emailService.js
export const enviarEmailCliente = async (datosCliente) => {
  // Usaremos EmailJS (gratis para 200 emails/mes)
  // Primero, regístrate en https://www.emailjs.com/
  
  const templateParams = {
    to_name: 'Ardelo',
    from_name: datosCliente.nombre,
    from_email: datosCliente.email,
    telefono: datosCliente.telefono || 'No proporcionado',
    message: datosCliente.mensaje,
    fecha: new Date().toLocaleString('es-CL'),
    interes: datosCliente.interes || 'general'
  };

  try {
    // Necesitarás configurar estas variables en tu .env
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      console.warn('EmailJS no configurado. Configura las variables en .env');
      return { success: false, message: 'Servicio de email no configurado' };
    }

    // Cargar EmailJS dinámicamente
    const emailjs = await import('@emailjs/browser');
    
    const response = await emailjs.send(
      serviceID,
      templateID,
      templateParams,
      publicKey
    );

    console.log('Email enviado:', response);
    return { success: true, message: 'Email enviado exitosamente' };
    
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, message: error.text || error.message };
  }
};