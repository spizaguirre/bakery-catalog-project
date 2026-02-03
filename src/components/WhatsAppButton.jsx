const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/593986656631"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-green-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg floating-button z-40 hover:shadow-xl transition hover:scale-105"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fab fa-whatsapp text-xl sm:text-2xl"></i>
    </a>
  )
}

export default WhatsAppButton