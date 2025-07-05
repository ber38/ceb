
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-red-700/50 pb-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-amber-50 tracking-wider">
        Quartier Général des Pourfendeurs
      </h1>
      <p className="text-lg sm:text-xl text-slate-300 mt-2 font-sans">
        Mission de Repérage
      </p>
      <div className="mt-6 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-red-900/30">
        <img
          src="https://storage.googleapis.com/genai-ui-experiments/dev/demon-slayer-season-2-.jpg"
          alt="L'équipe de Demon Slayer"
          className="w-full h-auto object-cover"
        />
      </div>
    </header>
  );
};
