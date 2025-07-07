
import React, { useState, useCallback } from 'react';
import { QUESTS, SOLUTIONS, ENCODED_PASSWORD } from './constants';
import { Map } from './components/Map';
import { QuestPanel } from './components/QuestPanel';
import { AdultZone } from './components/AdultZone';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [quest3UserPath, setQuest3UserPath] = useState<string[]>([]);
  const [showSolutions, setShowSolutions] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleAnswerChange = useCallback((questId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questId]: value }));
  }, []);

  const handleMapClick = useCallback((cellId: string) => {
    const quest3Answer = QUESTS.find(q => q.id === 3)?.answer as string[];
    if (!quest3Answer || quest3UserPath.length >= quest3Answer.length) return;

    const nextCorrectCell = quest3Answer[quest3UserPath.length];
    if (cellId === nextCorrectCell) {
      setQuest3UserPath(prev => [...prev, cellId]);
    } else {
      // Incorrect click, reset the path for implicit feedback
      setQuest3UserPath([]);
    }
  }, [quest3UserPath]);

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
      <div className="max-w-screen-2xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-9">
              <Map
                onMapClick={handleMapClick}
                quest3UserPath={quest3UserPath}
                showSolutions={showSolutions}
              />
            </div>
            <div className="lg:col-span-3">
               <div className="rounded-lg overflow-hidden shadow-2xl shadow-red-900/30 border-2 border-slate-700">
                  <img
                    src="demon-slayer-season-2-.jpg"
                    alt="L'équipe de Demon Slayer"
                    className="w-full h-auto object-cover"
                  />
                </div>
            </div>
          </div>

          <div className="my-10">
            <AdultZone
              solutions={SOLUTIONS}
              showSolutions={showSolutions}
              onPasswordSubmit={handlePasswordSubmit}
              error={passwordError}
            />
          </div>

          <QuestPanel
            quests={QUESTS}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            showSolutions={showSolutions}
            quest3UserPath={quest3UserPath}
          />
        </main>
      </div>
    </div>
  );
};

export default App;