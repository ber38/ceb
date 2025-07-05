
import React from 'react';
import { Quest as QuestData, QuestType } from '../types';

interface QuestProps {
  quest: QuestData;
  answer: string;
  onAnswerChange: (questId: number, value: string) => void;
  onRevealPath: () => void;
}

const normalizeAnswer = (str: string) => str.replace(/[\s–-]/g, '').toLowerCase();

export const Quest: React.FC<QuestProps> = ({ quest, answer, onAnswerChange, onRevealPath }) => {
  
  const isCorrect = quest.type !== QuestType.REVEAL_PATH && answer && normalizeAnswer(answer) === normalizeAnswer(quest.answer as string);

  const borderClass = isCorrect ? 'border-green-500' : 'border-amber-800/80';

  return (
    <div className={`bg-amber-50/95 p-6 rounded-lg shadow-md border-4 ${borderClass} relative transition-all duration-300`}>
       <div className="absolute -top-4 -left-4 w-6 h-6 bg-amber-800 rounded-full"></div>
       <div className="absolute -top-4 -right-4 w-6 h-6 bg-amber-800 rounded-full"></div>
       <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-800 rounded-full"></div>
       <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-amber-800 rounded-full"></div>

      <h3 className="text-2xl text-amber-900">{quest.title}</h3>
      <p className="mt-3 text-slate-800 text-base font-sans whitespace-pre-wrap">{quest.text}</p>
      <div className="mt-4 font-sans">
        {quest.type === QuestType.INPUT_COORDS && (
          <div className="flex items-center space-x-2">
            <span className="text-slate-600">I7 -</span>
            <input
              type="text"
              value={answer.replace(/^I7-?/, '')}
              onChange={(e) => onAnswerChange(quest.id, `I7-${e.target.value}`)}
              placeholder="..."
              className="flex-grow bg-white/50 border-2 border-amber-700 rounded p-2 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        )}
        {(quest.type === QuestType.INPUT_TEXT) && (
          <input
            type="text"
            value={answer}
            onChange={(e) => onAnswerChange(quest.id, e.target.value)}
            placeholder={quest.placeholder}
            className="w-full bg-white/50 border-2 border-amber-700 rounded p-2 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
        )}
        {quest.type === QuestType.REVEAL_PATH && (
          <button
            onClick={onRevealPath}
            className="w-full bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800 transition-colors duration-200 shadow-lg border-b-4 border-red-900 active:border-b-0 active:translate-y-1"
          >
            {quest.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
