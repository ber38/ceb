import React, { useState } from 'react';
import { LockClosedIcon, XMarkIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPasswordB64: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess, correctPasswordB64 }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (btoa(password) === correctPasswordB64) {
        setError('');
        onSuccess();
        onClose();
      } else {
        setError('Mot de passe incorrect. Accès refusé.');
      }
    } catch (err) {
      setError('Une erreur est survenue durant la vérification.');
    }
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-[#2a2a3e] border border-purple-400 rounded-lg shadow-2xl p-8 m-4 max-w-sm w-full relative transform transition-all scale-100 opacity-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="text-center">
          <LockClosedIcon className="mx-auto h-12 w-12 text-purple-400" />
          <h3 className="mt-4 text-2xl font-bold leading-6 text-white">Zone Professeur</h3>
          <p className="mt-2 text-sm text-gray-300">
            Cette section est protégée. Veuillez entrer le mot de passe maître pour déverrouiller les quêtes.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="password" className="sr-only">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-900 border border-purple-500 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Mot de passe"
              required
            />
          </div>
          {error && <p className="mt-3 text-sm text-red-500 text-center">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
            >
              Déverrouiller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};