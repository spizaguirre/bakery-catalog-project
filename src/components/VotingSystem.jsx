import { useState, useEffect } from 'react';
import { saveVote, getVotes } from '../firebase'; // Asegúrate de tener este archivo configurado

const VotingSystem = () => {
  const [votos, setVotos] = useState({});
  const [total, setTotal] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');

  const productNames = {
    'torta-chocolate': 'Torta de Chocolate',
    'cupcakes-decorados': 'Cupcakes Decorados',
    'galletas-personalizadas': 'Galletas Personalizadas',
    'chessecake': 'Chessecake de Maracuyá',
    'brownies': 'Brownies',
    'brazo-gitano': 'Brazo Gitano'
  };

  const cargarVotos = async () => {
    const result = await getVotes();
    if (result.success && result.data) {
      const counts = {};
      let sum = 0;
      Object.values(result.data).forEach(v => {
        counts[v.productID] = (counts[v.productID] || 0) + 1;
        sum++;
      });
      setVotos(counts);
      setTotal(sum);
    }
  };

  useEffect(() => { cargarVotos(); }, []);

  const manejarVoto = async (e) => {
    e.preventDefault();
    if (!productoSeleccionado) return alert("Selecciona un producto");
    
    const res = await saveVote(productoSeleccionado);
    if (res.status === "success") {
      alert("¡Voto registrado!");
      cargarVotos();
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-neutral-900">
      <div className="max-w-md mx-auto p-6 bg-gray-50 dark:bg-neutral-800 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-brand-pink-500 mb-6 text-center">Vota por tu Favorito</h2>
        
        <form onSubmit={manejarVoto} className="flex gap-2 mb-8">
          <select 
            className="flex-1 p-2 rounded-lg border dark:bg-neutral-700 dark:text-white"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {Object.entries(productNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          <button className="bg-brand-pink-500 text-white px-4 py-2 rounded-lg font-bold">VOTAR</button>
        </form>

        <div className="space-y-4">
          {Object.entries(votos).map(([id, count]) => (
            <div key={id}>
              <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                <span>{productNames[id]}</span>
                <span>{((count/total)*100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-pink-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${(count/total)*100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VotingSystem;