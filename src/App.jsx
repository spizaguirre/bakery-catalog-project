import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import VotingSystem from './components/VotingSystem';
import Toast from './components/Toast'; // Importamos el Toast
import Footer from './components/Footer';
import { fetchProducts } from './services/api';
import './index.css'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(res => {
      if (res.success) setProducts(res.body);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Features />
      
      <main className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-brand-pink-600">Nuestro Catálogo</h2>
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <VotingSystem />
      </main>

      <Toast /> {/* El Toast aparecerá solo después de 3 segundos */}
      <Footer />
    </div>
  );
}

export default App;