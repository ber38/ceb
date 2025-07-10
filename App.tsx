
import React, { useState, useCallback } from 'react';
import Grid from './components/Grid';
import { QuestPanel } from './components/QuestPanel';
import { Modal } from './components/Modal';
import { QUESTS_DATA, CORRECT_ANSWERS, CROW_PATH_COORDS, PASSWORD_B64, GRID_COLS, GRID_ROWS } from './constants';

function App() {
  const [solvedQuests, setSolvedQuests] = useState<number[]>([]);
  const [animatedPathCoords, setAnimatedPathCoords] = useState<string[]>([]);
  const [clickedPath, setClickedPath] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solutionsUnlocked, setSolutionsUnlocked] = useState(false);

  const handleValidate = useCallback((id: number, answer: string): boolean => {
    const correctAnswer = CORRECT_ANSWERS[id as keyof typeof CORRECT_ANSWERS];
    if (!correctAnswer) return false;

    let isCorrect = false;
    
    if (id === 1) {
      const cleanedAnswer = answer.toLowerCase().replace(/\s/g, '');
      const pathWithI10 = "i10,i9,i8,i7,i6,i5,i4,j4,k4,l4,m4";
      const pathWithoutI10 = "i9,i8,i7,i6,i5,i4,j4,k4,l4,m4";
      isCorrect = cleanedAnswer === pathWithI10 || cleanedAnswer === pathWithoutI10;
    } else if (id === 3) {
      // For quest 3, compare the ordered path
      const userAnswerPath = clickedPath.map(c => c.toLowerCase()).join(',');
      const correctAnswerPath = CROW_PATH_COORDS.map(c => c.toLowerCase()).join(',');
      isCorrect = userAnswerPath === correctAnswerPath;
      
      if (isCorrect) {
        // Animate the correct path in order on success
        setAnimatedPathCoords([]);
        CROW_PATH_COORDS.forEach((coord, index) => {
          setTimeout(() => {
            setAnimatedPathCoords(prev => [...prev, coord]);
          }, index * 150);
        });
      }
    } else {
      isCorrect = answer.toLowerCase().replace(/[\s,]/g, '') === correctAnswer.replace(/[\s,]/g, '');
    }

    if (isCorrect) {
      setSolvedQuests(prev => [...prev, id]);
    }
    return isCorrect;
  }, [clickedPath]);

  const handleGridClick = useCallback((cellId: string) => {
    if (solvedQuests.includes(3)) return;

    const finalCellId = cellId;

    setClickedPath(prev => {
      const index = prev.indexOf(finalCellId);
      if (index > -1) {
        // If cell is already in the path, remove it and all subsequent cells.
        // This allows the user to easily correct a mistake in the path.
        return prev.slice(0, index);
      } else {
        // Add new cell to the path
        return [...prev, finalCellId];
      }
    });
  }, [solvedQuests]);
  
  const handleUnlockSolutions = () => {
    setSolutionsUnlocked(true);
  };

  return (
    <main className="bg-[#12121c] min-h-screen text-white p-4 sm:p-6 lg:p-8" style={{
        backgroundImage: `linear-gradient(rgba(18, 18, 28, 0.95), rgba(18, 18, 28, 0.95)), url(https://picsum.photos/seed/demonslayer/1920/1080)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-amber-100" style={{textShadow: '0 2px 15px rgba(162, 28, 175, 0.5)'}}>
            Demon Slayer: Mission au QG des Pourfendeurs
          </h1>
          <p className="text-purple-300 mt-2">Observez la carte et accomplissez vos missions, pourfendeur.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
             <div className="p-4 bg-black/30 rounded-xl shadow-lg border border-purple-500/30">
                {/* Column Headers */}
                <div className="grid" style={{ 
                    gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                    marginLeft: '2rem' // Offset for row headers
                }}>
                    {Array.from({ length: GRID_COLS }).map((_, i) => (
                        <div key={`col-header-${i}`} className="text-center font-bold text-purple-300 pb-1">
                            {String.fromCharCode(65 + i)}
                        </div>
                    ))}
                </div>

                <div className="flex">
                    {/* Row Headers */}
                    <div className="flex flex-col justify-around font-bold text-purple-300 w-8">
                        {Array.from({ length: GRID_ROWS }).map((_, i) => (
                            <div key={`row-header-${i}`} className="text-center">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    {/* Grid */}
                    <div className="flex-1">
                        <Grid 
                            animatedPathCoords={animatedPathCoords}
                            selectedPath={clickedPath}
                            onCellClick={handleGridClick}
                        />
                    </div>
                </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <QuestPanel
              quests={QUESTS_DATA}
              onValidate={handleValidate}
              solvedQuests={solvedQuests}
              solutions={CORRECT_ANSWERS}
              onOpenModal={() => setIsModalOpen(true)}
              solutionsUnlocked={solutionsUnlocked}
              clickedPath={clickedPath}
            />
          </div>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUnlockSolutions}
        correctPasswordB64={PASSWORD_B64}
      />
    </main>
  );
}

export default App;