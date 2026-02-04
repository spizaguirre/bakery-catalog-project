import { useState, useEffect } from 'react';

const Navbar = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Al cargar, revisar si ya había una preferencia guardada
    const savedMode = localStorage.getItem('theme') === 'dark';
    if (savedMode) setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav>
      {/* Botón para cambiar modo oscuro/claro si lo necesitas */}
      {/* <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button> */}
      {children}
    </nav>
  );
};

export default Navbar;