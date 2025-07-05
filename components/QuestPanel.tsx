
import React from 'react';
import { Quest as QuestType } from '../types';
import { Quest } from './Quest';

interface QuestPanelProps {
  quests: QuestType[];
  answers: { [key: number]: string };
  onAnswerChange: (questId: number, value: string) => void;
  onRevealPath: () => void;
}

export const QuestPanel: React.FC<QuestPanelProps> = ({ quests, answers, onAnswerChange, onRevealPath }) => {
  return (
    <div className="space-y-6">
      {quests.map(quest => (
        <Quest
          key={quest.id}
          quest={quest}
          answer={answers[quest.id] || ''}
          onAnswerChange={onAnswerChange}
          onRevealPath={onRevealPath}
        />
      ))}
    </div>
  );
};
