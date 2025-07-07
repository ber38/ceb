
import React from 'react';
import { Quest as QuestData, QuestType } from '../types';

interface QuestProps {
  quest: QuestData;
  answer: string;
  onAnswerChange: (questId: number, value: string) => void;
  showSolutions: boolean;
  quest3UserPath: string[];
}

const normalizeAnswer = (str: string) => str.replace(/[\s–-]/g, '').toLowerCase();

export const Quest: React.FC<QuestProps> = ({ quest, answer, onAnswerChange, showSolutions, quest3UserPath }) => {
  
  let isCorrect = false;
  if (quest.type === QuestType.TRACE_PATH) {
    isCorrect = quest3UserPath.length === (quest.answer as string[]).length;
  } else if (answer) {
    isCorrect = normalizeAnswer(answer) === normalizeAnswer(quest.answer as string);
  }

  const borderClass = isCorrect ? 'border-green-500' : 'border-amber-800/80';

  return (
    <div className={`relative pt-8 pb-8 bg-amber-50/95 rounded-sm shadow-md transition-all duration-300`}>
      {/* Top scroll bar */}
      <div className={`absolute -top-1 left-[-4px] right-[-4px] h-4 bg-yellow-900/90 rounded-full border-2 ${borderClass} shadow-inner`}></div>
      <div className={`bg-amber-50/95 p-4 border-x-4 ${borderClass}`}>
        <h3 className="text-2xl text-amber-900 text-center">{quest.title}</h3>
        <p className="mt-3 text-slate-800 text-base font-sans whitespace-pre-wrap">{quest.text}</p>
        <div className="mt-4 font-sans min-h-[52px]">
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
          {quest.type === QuestType.TRACE_PATH && (
             <div className="text-center">
              <p className="text-sm text-slate-600 italic">
                Cliquez sur les cases de la carte. Une erreur réinitialisera votre progression.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Bottom scroll bar */}
      <div className={`absolute -bottom-1 left-[-4px] right-[-4px] h-4 bg-yellow-900/90 rounded-full border-2 ${borderClass} shadow-inner`}></div>
    </div>
  );
};
