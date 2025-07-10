import React from 'react';
import { Quest } from '../types';
import { QuestComponent } from './Quest';
import { LockOpenIcon } from './Icons';

interface QuestPanelProps {
  quests: Quest[];
  onValidate: (id: number, answer: string) => boolean;
  solvedQuests: number[];
  solutions: { [key: number]: string };
  onOpenModal: () => void;
  solutionsUnlocked: boolean;
  clickedPath: string[];
}

export const QuestPanel: React.FC<QuestPanelProps> = ({
  quests,
  onValidate,
  solvedQuests,
  solutions,
  onOpenModal,
  solutionsUnlocked,
  clickedPath
}) => {
  return (
    <div className="bg-stone-900/50 border-2 border-amber-300/30 rounded-lg p-6 shadow-2xl relative overflow-y-auto" style={{
        backgroundImage: 'radial-gradient(circle at top right, rgba(109, 40, 217, 0.1), transparent 50%), radial-gradient(circle at bottom left, rgba(162, 28, 175, 0.1), transparent 50%)',
        backgroundBlendMode: 'plus-lighter'
    }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-amber-200" style={{ textShadow: '0 0 10px rgba(253, 230, 138, 0.4)'}}>
            Missions du Corps
        </h2>
        <button
            onClick={onOpenModal}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-yellow-300 border-2 border-yellow-400/50 rounded-lg hover:bg-yellow-400/20 hover:border-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={solutionsUnlocked}
        >
            <LockOpenIcon className="w-5 h-5"/>
            {solutionsUnlocked ? 'Quêtes déverrouillées' : 'Déverrouiller'}
        </button>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-black/20 border border-purple-400/30">
        <h4 className="text-lg font-bold text-amber-200 mb-3">Légende de la carte</h4>
        <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-sm bg-stone-600/50 border border-stone-500/30"></div>
                <span>Couloir / Chemin</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-sm bg-red-900/70 border border-red-700"></div>
                <span>Salle / Zone colorée</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-sm bg-black/30 relative">
                    <div className="absolute w-1 h-1/4 top-1/2 left-0 -translate-y-1/2 bg-amber-400 rounded-sm shadow-lg shadow-amber-400/50"></div>
                </div>
                <span>Entrée / Sortie</span>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {quests.map(quest => (
          <QuestComponent
            key={quest.id}
            quest={quest}
            onValidate={onValidate}
            isSolved={solvedQuests.includes(quest.id)}
            solution={solutions[quest.id] || ''}
            solutionsUnlocked={solutionsUnlocked}
            valueOverride={quest.id === 3 ? clickedPath.join(', ') : undefined}
          />
        ))}
      </div>
    </div>
  );
};