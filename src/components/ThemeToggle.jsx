const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-white dark:bg-neutral-800 p-2.5 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow hover:scale-105 border border-neutral-200 dark:border-neutral-700"
      aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {darkMode ? (
        <i className="fas fa-sun text-yellow-400 text-base sm:text-lg"></i>
      ) : (
        <i className="fas fa-moon text-neutral-700 text-base sm:text-lg"></i>
      )}
    </button>
  )
}

export default ThemeToggle