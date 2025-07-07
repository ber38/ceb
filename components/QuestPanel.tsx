
import React from 'react';
import { Quest as QuestType } from '../types';
import { Quest } from './Quest';

interface QuestPanelProps {
  quests: QuestType[];
  answers: { [key: number]: string };
  onAnswerChange: (questId: number, value: string) => void;
  showSolutions: boolean;
  quest3UserPath: string[];
}

export const QuestPanel: React.FC<QuestPanelProps> = ({ quests, answers, onAnswerChange, showSolutions, quest3UserPath }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
      {quests.map(quest => (
        <Quest
          key={quest.id}
          quest={quest}
          answer={answers[quest.id] || ''}
          onAnswerChange={onAnswerChange}
          showSolutions={showSolutions}
          quest3UserPath={quest3UserPath}
        />
      ))}
    </div>
  );
};
