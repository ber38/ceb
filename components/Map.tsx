
import React from 'react';
import { MAP_COLUMNS, MAP_ROWS, ROOM_LAYOUT } from '../constants';

interface MapProps {
  showQuest3Path: boolean;
}

const getRoomForCell = (cellId: string) => {
  return ROOM_LAYOUT.find(room => room.cells.includes(cellId));
};

const getCellCenter = (colIndex: number, rowIndex: number, cellSize: number) => {
    const x = colIndex * cellSize + cellSize / 2;
    const y = rowIndex * cellSize + cellSize / 2;
    return { x, y };
};

const pathCoordsToPoints = (path: string[], cellSize: number): string => {
    return path.map(coord => {
        const col = MAP_COLUMNS.indexOf(coord.charAt(0));
        const row = parseInt(coord.substring(1), 10) - 1;
        if (col === -1 || isNaN(row)) return '';
        const {x, y} = getCellCenter(col, row, cellSize);
        return `${x},${y}`;
    }).join(' ');
};

export const Map: React.FC<MapProps> = ({ showQuest3Path }) => {
  const cellSize = 40; // in pixels
  const gridWidth = MAP_COLUMNS.length * cellSize;
  const gridHeight = MAP_ROWS.length * cellSize;

  return (
    <div className="bg-stone-200/90 p-4 rounded-lg shadow-lg border-4 border-amber-900/50">
      <div className="relative font-sans" style={{ width: gridWidth, height: gridHeight }}>
        <div className="grid grid-cols-13" style={{ gridTemplateColumns: `repeat(${MAP_COLUMNS.length}, minmax(0, 1fr))` }}>
          {MAP_ROWS.map((row, rowIndex) =>
            MAP_COLUMNS.map((col, colIndex) => {
              const cellId = `${col}${row}`;
              const room = getRoomForCell(cellId);
              return (
                <div
                  key={cellId}
                  className={`w-10 h-10 border border-stone-400/50 flex items-center justify-center text-xs ${
                    room ? room.color : 'bg-stone-50'
                  }`}
                  title={room ? room.name : 'Couloir'}
                >
                   {cellId === 'I8' && <span className="text-red-500 font-bold text-2xl">X</span>}
                </div>
              );
            })
          )}
        </div>
        {showQuest3Path && (
           <svg className="absolute top-0 left-0 w-full h-full" viewBox={`0 0 ${gridWidth} ${gridHeight}`}>
             <polyline
                points={pathCoordsToPoints(['C7', 'C6', 'D6', 'E6', 'E5', 'E4', 'G4', 'H4', 'I4', 'I3'], cellSize)}
                fill="none"
                stroke="rgba(239, 68, 68, 0.8)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="crow-path"
             />
           </svg>
        )}
      </div>
       <div className="flex justify-center mt-2" style={{ width: gridWidth }}>
          {MAP_COLUMNS.map(col => <div key={col} className="w-10 text-center text-sm font-bold text-slate-800">{col}</div>)}
        </div>
        <div className="absolute top-4 -left-8 text-sm font-bold text-slate-800">
            {MAP_ROWS.map(row => <div key={row} className="h-10 flex items-center">{row}</div>)}
        </div>
    </div>
  );
};
