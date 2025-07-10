
import React from 'react';
import { GRID_ROWS, GRID_COLS, GRID_MAP } from '../constants';
import { Cell, CellType } from '../types';
import { SunIcon } from './Icons';

interface GridProps {
  animatedPathCoords: string[];
  selectedPath: string[];
  onCellClick: (cellId: string) => void;
}

const getCellStyle = (type: CellType): string => {
  switch (type) {
    case CellType.WALL: return 'bg-gray-800';
    case CellType.PATH: return 'bg-stone-600/50 border border-stone-500/30';
    case CellType.GATE: return 'bg-yellow-900/70 border border-yellow-700 text-yellow-200';
    case CellType.DOJO: return 'bg-red-900/70 border border-red-700 text-red-200';
    case CellType.UBUYASHIKI_RESIDENCE: return 'bg-purple-900/70 border border-purple-700 text-purple-200';
    case CellType.BUTTERFLY_MANSION: return 'bg-pink-900/70 border border-pink-700 text-pink-200';
    case CellType.FINAL_SELECTION_MOUNTAIN: return 'bg-indigo-900/70 border border-indigo-700 text-indigo-200';
    case CellType.STABLES: return 'bg-amber-900/70 border border-amber-700 text-amber-200';
    case CellType.SOBA_SHOP: return 'bg-orange-900/70 border border-orange-700 text-orange-200';
    case CellType.RECOVERY_ROOM: return 'bg-cyan-900/70 border border-cyan-700 text-cyan-200';
    case CellType.ONSEN: return 'bg-sky-900/70 border border-sky-700 text-sky-200';
    case CellType.TRAINING_AREA: return 'bg-teal-900/70 border border-teal-700 text-teal-200';
    case CellType.COURTYARD: return 'bg-lime-900/50 border border-lime-700 text-lime-200';
    case CellType.HASHIRA_MEETING_HALL: return 'bg-fuchsia-900/70 border border-fuchsia-700 text-fuchsia-200';
    case CellType.INFINITY_CASTLE: return 'bg-slate-900/80 border border-slate-700 text-slate-200';
    case CellType.ARCHIVES: return 'bg-stone-800/80 border border-stone-600 text-stone-200';
    case CellType.WISTERIA_GARDEN: return 'bg-violet-800/60 border border-violet-600 text-violet-200';
    case CellType.RALLY_POINT: return 'bg-yellow-500/20 flex items-center justify-center';
    default: return 'bg-black/30';
  }
};

const getDoorStyle = (door: 'N' | 'S' | 'E' | 'W'): string => {
    switch (door) {
      case 'N':
        return 'h-1 w-1/4 top-0 left-1/2 -translate-x-1/2';
      case 'S':
        return 'h-1 w-1/4 bottom-0 left-1/2 -translate-x-1/2';
      case 'E':
        return 'w-1 h-1/4 top-1/2 right-0 -translate-y-1/2';
      case 'W':
        return 'w-1 h-1/4 top-1/2 left-0 -translate-y-1/2';
      default:
        return '';
    }
};

const extendedCellMap = new Map<string, Cell>();
GRID_MAP.forEach(cell => {
    const startCol = cell.id.charCodeAt(0) - 64;
    const startRow = parseInt(cell.id.substring(1));
    const colSpan = cell.colSpan || 1;
    const rowSpan = cell.rowSpan || 1;
    for (let r = 0; r < rowSpan; r++) {
        for (let c = 0; c < colSpan; c++) {
            const currentId = `${String.fromCharCode(64 + startCol + c)}${startRow + r}`;
            extendedCellMap.set(currentId, cell);
        }
    }
});

const Grid: React.FC<GridProps> = ({ animatedPathCoords, selectedPath, onCellClick }) => {
  const gridCells = [];
  for (let row = 1; row <= GRID_ROWS; row++) {
    for (let col = 1; col <= GRID_COLS; col++) {
      const colChar = String.fromCharCode(64 + col);
      const cellId = `${colChar}${row}`;
      
      const isSelected = selectedPath.includes(cellId);
      const isAnimated = animatedPathCoords.includes(cellId);

      const mainCellData = extendedCellMap.get(cellId);

      if (mainCellData) {
        const isTopLeft = mainCellData.id === cellId;
        gridCells.push(
          <div
            key={cellId}
            data-coord={cellId}
            onClick={() => onCellClick(cellId)}
            className={`
              ${getCellStyle(mainCellData.type)}
              ${isAnimated ? 'animate-pulse-red' : ''}
              ${isSelected ? 'ring-2 ring-blue-400 ring-inset' : ''}
              relative rounded-sm shadow-inner flex items-center justify-center text-center p-1 transition-all cursor-pointer
            `}
            title={mainCellData.label}
          >
            {isTopLeft && mainCellData.label && <span className="text-xs font-bold select-none z-10">{mainCellData.label}</span>}
            {isTopLeft && mainCellData.type === CellType.RALLY_POINT && <SunIcon className="w-8 h-8 text-yellow-400 z-10" />}
            {isTopLeft && mainCellData.door && <div className={`absolute bg-amber-400 rounded-sm shadow-lg shadow-amber-400/50 z-20 ${getDoorStyle(mainCellData.door)}`} title="Entrée/Sortie"></div>}
          </div>
        );
      } else {
         gridCells.push(
            <div 
              key={cellId} 
              data-coord={cellId} 
              onClick={() => onCellClick(cellId)}
              className={`
                bg-gray-900/50 border border-gray-800/50 relative transition-all cursor-pointer
                ${isSelected ? 'ring-2 ring-blue-400 ring-inset' : ''}
              `}
            >
            </div>
        );
      }
    }
  }

  return (
    <div className="grid gap-0.5" style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
        aspectRatio: `${GRID_COLS} / ${GRID_ROWS}`
    }}>
        {gridCells}
    </div>
  );
};

export default Grid;