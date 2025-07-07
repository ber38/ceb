
import React, { useState, useEffect } from 'react';

interface AdultZoneProps {
  solutions: { [key: number]: string };
  showSolutions: boolean;
  onPasswordSubmit: (password: string) => void;
  error: string;
}

export const AdultZone: React.FC<AdultZoneProps> = ({ solutions, showSolutions, onPasswordSubmit, error }) => {
  const [password, setPassword] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (showSolutions) {
      setIsExpanded(true);
    }
  }, [showSolutions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  if (!isExpanded) {
    return (
        <div className="text-center">
            <button 
                onClick={() => setIsExpanded(true)}
                className="bg-slate-700/80 text-slate-300 font-bold py-3 px-8 rounded-lg hover:bg-slate-600/80 transition-colors duration-200 border border-slate-600 shadow-lg font-sans"
            >
                Zone pour l'adulte (Afficher les solutions)
            </button>
        </div>
    );
  }

  return (
    <div className="bg-slate-800/50 p-4 sm:p-6 rounded-lg border border-slate-700 max-w-2xl mx-auto font-sans">
      <h3 className="text-xl text-slate-300 mb-4 text-center">Zone pour l'adulte</h3>
      {showSolutions ? (
        <div>
          <h4 className="text-2xl text-green-400 mb-4 text-center">Solutions des Quêtes</h4>
          <ul className="space-y-3 text-slate-200">
            {Object.entries(solutions).map(([id, solution]) => (
              <li key={id} className="p-3 bg-slate-700/50 rounded-md">
                <strong className="text-green-300">Quête {id}:</strong> {solution}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrer le mot de passe"
            className="flex-grow w-full sm:w-auto bg-slate-700 border border-slate-600 rounded p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors duration-200"
          >
            Afficher les solutions
          </button>
        </form>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};
