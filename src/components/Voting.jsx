import { useState } from 'react';

const Voting = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [votes, setVotes] = useState({
    'torta-chocolate': 0,
    'cupcakes-decorados': 0,
    'galletas-personalizadas': 0,
    'chessecake': 0,
    'brownies': 0,
    'brazo-gitano': 0,
  });

  const products = [
    { value: 'torta-chocolate', label: 'Torta de chocolate' },
    { value: 'cupcakes-decorados', label: 'Cupcakes Decorados' },
    { value: 'galletas-personalizadas', label: 'Galletas personalizadas' },
    { value: 'chessecake', label: 'Chessecake de Maracuyá' },
    { value: 'brownies', label: 'Brownies' },
    { value: 'brazo-gitano', label: 'Brazo Gitano' },
  ];

  const handleVote = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setVotes(prev => ({
      ...prev,
      [selectedProduct]: prev[selectedProduct] + 1
    }));

    setSelectedProduct('');
  };

  const totalVotes = Object.values(votes).reduce((sum, vote) => sum + vote, 0);

  return (
    <section className="flex flex-col items-center justify-center bg-white dark:bg-neutral-900 py-8">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-brand-pink-500 dark:text-white">
          Vota por tu producto preferido
        </h2>

        <div className="mb-6">
          <form onSubmit={handleVote} className="relative flex items-center">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="block appearance-none w-full bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:border-transparent"
            >
              <option value="" disabled>Seleccione un producto</option>
              {products.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={!selectedProduct}
              className="ml-4 bg-brand-pink-500 hover:bg-brand-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink-400 focus:ring-opacity-50 transition"
            >
              VOTAR
            </button>
          </form>
        </div>

        <div className="border border-gray-400 dark:border-neutral-600 rounded-lg h-58 w-full p-4 bg-gray-50 dark:bg-neutral-700">
          <h3 className="font-bold text-gray-800 dark:text-white mb-3">Resultado de la votación</h3>
          {totalVotes === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-center mt-8">No hay votos aún</p>
          ) : (
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.value} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{product.label}</span>
                  <span className="text-sm font-bold text-brand-pink-500 dark:text-brand-pink-300">
                    {votes[product.value]} votos
                    {totalVotes > 0 && (
                      <span className="ml-2 text-xs text-gray-500">
                        ({Math.round((votes[product.value] / totalVotes) * 100)}%)
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Voting;