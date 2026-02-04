// src/components/Contact.jsx - VERSIÓN COMPLETA
import { useState } from 'react';
import { guardarCliente } from '../../firebase/config';
import { enviarEmailCliente } from '../services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    interes: 'consulta'
  });

  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setMensajeEstado({
        tipo: 'error',
        texto: 'Por favor completa todos los campos obligatorios'
      });
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMensajeEstado({
        tipo: 'error',
        texto: 'Por favor ingresa un email válido'
      });
      return;
    }

    setEnviando(true);
    setMensajeEstado({ tipo: 'info', texto: 'Enviando tu mensaje...' });

    try {
      // 1. Guardar en Firebase
      const resultadoFirebase = await guardarCliente(formData);

      if (!resultadoFirebase.success) {
        throw new Error(`Error guardando datos: ${resultadoFirebase.message}`);
      }

      // 2. Enviar email
      const resultadoEmail = await enviarEmailCliente(formData);

      if (!resultadoEmail.success) {
        console.warn('Email no enviado, pero datos guardados:', resultadoEmail.message);
      }

      // 3. Preparar mensaje para WhatsApp
      const mensajeWhatsApp = `Hola! Soy ${formData.nombre}. ${formData.mensaje} Mi email: ${formData.email}${formData.telefono ? ` Tel: ${formData.telefono}` : ''}`;
      const whatsappURL = `https://wa.me/593986656631?text=${encodeURIComponent(mensajeWhatsApp)}`;
      // Reemplaza 569XXXXXXXXX con tu número real (ej: 56912345678)

      // 4. Mostrar éxito
      setMensajeEstado({
        tipo: 'exito',
        texto: ` Mensaje enviado exitosamente!\n\nHemos guardado tus datos y te contactaremos pronto.\n\n¿Quieres enviarnos un mensaje directo por WhatsApp?`
      });

      // 5. Abrir WhatsApp en nueva ventana (opcional)
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1500);

      // 6. Resetear formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        interes: 'consulta'
      });

    } catch (error) {
      console.error('Error en el proceso:', error);
      setMensajeEstado({
        tipo: 'error',
        texto: ` Hubo un error: ${error.message}\n\nPor favor intenta nuevamente o contáctanos directamente por WhatsApp.`
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contact" className="py-16 section-gradient-3">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-subtitles-2 mb-4">
            Contáctanos
          </h2>
          <p className="text-brand-content max-w-2xl mx-auto">
            ¿Tienes preguntas o quieres un pedido personalizado? ¡Escríbenos!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mensajes de estado */}
          {mensajeEstado.texto && (
            <div className={`mb-6 p-4 rounded-lg ${mensajeEstado.tipo === 'exito'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-300'
                : mensajeEstado.tipo === 'error'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-300'
              }`}>
              <div className="flex items-start">
                <i className={`fas ${mensajeEstado.tipo === 'exito' ? 'fa-check-circle text-green-500' :
                    mensajeEstado.tipo === 'error' ? 'fa-exclamation-triangle text-red-500' :
                      'fa-info-circle text-blue-500'
                  } mt-1 mr-3`}></i>
                <div className="whitespace-pre-line">{mensajeEstado.texto}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información de contacto */}
            <div className="lg:col-span-1">
              <div className="bg-brand-box rounded-2xl p-6 shadow-lg h-full">
                <h3 className="text-xl font-bold text-brand-titulo-logo mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-brand-pink-100 dark:bg-brand-pink-900/30 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-brand-pink-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-content">Email</h4>
                      <a
                        href="mailto:ardelofiissa25@gmail.com"
                        className="text-brand-content hover:text-brand-pink-500 transition-colors"
                      >
                        ardelofiissa25@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                      <i className="fab fa-whatsapp text-green-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-content">WhatsApp</h4>
                      <a
                        href="https://wa.me/593986656631"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-content hover:text-green-500 transition-colors"
                      >
                        +593 98 665 6631
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-blue-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-content">Horario de Atención</h4>
                      <p className="text-brand-content">
                        Lunes a Viernes: 9:00 - 20:00
                      </p>
                      <p className="text-brand-content">
                        Sábados y Domingos: 10:00 - 17:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                      <i className="fab fa-instagram text-white"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-titulo-logo">Instagram</h4>
                      <a
                        href="https://www.instagram.com/horneando_con_amor24/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-content hover:text-brand-pink-500 transition-colors"
                      >
                        @horneando_con_amor24
                      </a>
                      <p className="text-sm text-brand-content mt-1">
                        Mira nuestras últimas creaciones
                      </p>
                    </div>
                  </div>

                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <i className="fas fa-info-circle mr-2"></i>
                    Te responderemos en menos de 24 horas hábiles
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-2">
              <div className="bg-brand-box rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl font-bold text-brand-titulo-logo mb-6">
                  Envíanos un mensaje
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-content mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                        placeholder="Tu nombre"
                        disabled={enviando}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-content mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                        placeholder="tucorreo@ejemplo.com"
                        disabled={enviando}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-content mb-2">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                        placeholder="+56 9 1234 5678"
                        disabled={enviando}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-content mb-2">
                        Motivo de contacto
                      </label>
                      <select
                        name="interes"
                        value={formData.interes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                        disabled={enviando}
                      >
                        <option value="consulta">Consulta general</option>
                        <option value="presupuesto">Solicitar presupuesto</option>
                        <option value="personalizado">Pedido personalizado</option>
                        <option value="reclamo">Reclamo o sugerencia</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-content mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-brand-pink-500 focus:border-transparent"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                      disabled={enviando}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacidad"
                      required
                      className="w-4 h-4 text-brand-pink-500 rounded focus:ring-brand-pink-500"
                      disabled={enviando}
                    />
                    <label htmlFor="privacidad" className="ml-2 text-sm text-brand-content">
                      Acepto la política de privacidad y el tratamiento de mis datos
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full py-4 bg-gradient-to-r from-brand-pink-500 to-brand-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-brand-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {enviando ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Enviar Mensaje
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-neutral-500 dark:text-neutral-500">
                    También puedes contactarnos directamente por WhatsApp
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;