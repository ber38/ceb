
import React, { useState, useEffect } from 'react';
import { Quest, QuestInputType } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface QuestProps {
  quest: Quest;
  onValidate: (id: number, answer: string) => boolean;
  isSolved: boolean;
  solution: string;
  solutionsUnlocked: boolean;
  valueOverride?: string;
}

export const QuestComponent: React.FC<QuestProps> = ({ quest, onValidate, isSolved, solution, solutionsUnlocked, valueOverride }) => {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [hasBeenValidated, setHasBeenValidated] = useState(false);

  useEffect(() => {
    if (isSolved) {
      setStatus('correct');
      setHasBeenValidated(true);
    }
  }, [isSolved]);

  const handleValidate = () => {
    if (isSolved) return;
    setHasBeenValidated(true);
    const currentAnswer = valueOverride !== undefined ? valueOverride : answer;
    const isCorrect = onValidate(quest.id, currentAnswer);
    setStatus(isCorrect ? 'correct' : 'incorrect');
  };
  
  const isInputDisabled = isSolved;
  const isButtonDisabled = !solutionsUnlocked || isSolved;

  return (
    <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${status === 'correct' ? 'border-green-500 bg-green-900/30' : status === 'incorrect' ? 'border-red-500 bg-red-900/30' : 'border-purple-400/50 bg-[#2a2a3e]/50'}`}>
      <h3 className="text-xl font-bold text-purple-300">{quest.title}</h3>
      <p className="mt-2 text-gray-300">{quest.description}</p>
      
      <div className="mt-4">
        {quest.inputType === QuestInputType.TEXT && (
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={quest.placeholder}
            disabled={isInputDisabled}
            className="w-full bg-gray-900 border border-purple-500 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-purple-400 focus:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        )}
        {quest.inputType === QuestInputType.TEXTAREA && (
          <textarea
            value={valueOverride !== undefined ? valueOverride : answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={quest.placeholder}
            disabled={isInputDisabled}
            readOnly={valueOverride !== undefined}
            rows={3}
            className="w-full bg-gray-900 border border-purple-500 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-purple-400 focus:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        {quest.inputType === QuestInputType.TEXT || quest.inputType === QuestInputType.TEXTAREA || quest.inputType === QuestInputType.BUTTON ? (
          <button onClick={handleValidate} disabled={isButtonDisabled} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed">
            Valider la réponse
          </button>
        ) : <div />}
        
        <div className="w-6 h-6 ml-4">
          {status === 'correct' && <CheckCircleIcon className="text-green-500" />}
          {status === 'incorrect' && <XCircleIcon className="text-red-500" />}
        </div>
      </div>
      
      {hasBeenValidated && solutionsUnlocked && (
        <div className="mt-4 p-3 bg-gray-900/50 border-l-4 border-yellow-500 rounded">
            <p className="text-sm text-yellow-300 font-bold">Solution :</p>
            <p className="text-sm text-white font-mono mt-1">{solution}</p>
        </div>
      )}
    </div>
  );
};