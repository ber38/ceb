
import React, { useState, useCallback } from 'react';
import { QUESTS, SOLUTIONS, ENCODED_PASSWORD } from './constants';
import { Map } from './components/Map';
import { QuestPanel } from './components/QuestPanel';
import { AdultZone } from './components/AdultZone';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showQuest3Path, setShowQuest3Path] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleAnswerChange = useCallback((questId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questId]: value }));
  }, []);

  const handleRevealPath = useCallback(() => {
    setShowQuest3Path(true);
  }, []);

  const handlePasswordSubmit = useCallback((password: string) => {
    try {
      if (btoa(password) === ENCODED_PASSWORD) {
        setShowSolutions(true);
        setPasswordError('');
      } else {
        setShowSolutions(false);
        setPasswordError('Mot de passe incorrect.');
      }
    } catch (e) {
      setShowSolutions(false);
      setPasswordError('Erreur de validation.');
      console.error("Password encoding error:", e);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-900/80 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Map showQuest3Path={showQuest3Path} />
          <QuestPanel
            quests={QUESTS}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onRevealPath={handleRevealPath}
          />
        </main>
        <footer className="mt-12">
          <AdultZone
            solutions={SOLUTIONS}
            showSolutions={showSolutions}
            onPasswordSubmit={handlePasswordSubmit}
            error={passwordError}
          />
        </footer>
      </div>
    </div>
  );
};

export default App;
