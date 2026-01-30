import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { products } from './data/products';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors">
      <Navbar />
      <Hero />
      <Features />
      <section id="products" className="py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;