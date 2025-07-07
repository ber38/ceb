
import React, { useRef, useEffect } from 'react';
import { MAP_COLUMNS, MAP_ROWS, ROOM_LAYOUT } from '../constants';
import { Room } from '../types';

declare const p5: any;

interface MapProps {
  onMapClick: (cellId: string) => void;
  quest3UserPath: string[];
  showSolutions: boolean;
}

export const Map: React.FC<MapProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<any>(null);

    useEffect(() => {
        if (containerRef.current && !p5InstanceRef.current) {
            const sketch = (p: any) => {
                let currentProps = props;

                const QUEST_3_PATH_SOLUTION = ['C7', 'C6', 'D6', 'E6', 'E5', 'E4', 'G4', 'H4', 'I4', 'I3'];
                
                let headerSize = 30;
                let cellSize = 0;
                let canvasWidth = 0;
                let canvasHeight = 0;

                let solutionAnimationStartTime = 0;
                const solutionDuration = 4000;

                const calculateSizes = () => {
                    if (!containerRef.current) return;
                    canvasWidth = containerRef.current.offsetWidth;
                    headerSize = Math.max(24, canvasWidth * 0.05);
                    cellSize = (canvasWidth - headerSize) / MAP_COLUMNS.length;
                    canvasHeight = headerSize + MAP_ROWS.length * cellSize;
                };

                const getCellIdFromPixels = (x: number, y: number) => {
                    if (x < headerSize || y < headerSize) return null;
                    const col = Math.floor((x - headerSize) / cellSize);
                    const row = Math.floor((y - headerSize) / cellSize);
                    if (col >= MAP_COLUMNS.length || row >= MAP_ROWS.length) return null;
                    return MAP_COLUMNS[col] + (row + 1);
                };

                const getPixelCoords = (cellId: string, centered = true) => {
                    const col = MAP_COLUMNS.indexOf(cellId.charAt(0));
                    const row = parseInt(cellId.substring(1), 10) - 1;
                    if (col === -1 || isNaN(row)) return null;

                    const offset = centered ? 0.5 : 0;
                    const x = headerSize + (col + offset) * cellSize;
                    const y = headerSize + (row + offset) * cellSize;
                    return { x, y };
                };

                p.updateWithProps = (newProps: MapProps) => {
                    const wasSolutionHidden = !currentProps.showSolutions;
                    const isSolutionShown = newProps.showSolutions;
                    currentProps = newProps;

                    if (isSolutionShown && wasSolutionHidden) {
                        solutionAnimationStartTime = p.millis();
                        p.loop();
                    } else if (!p.isLooping()) {
                        p.redraw();
                    }
                };
                
                p.setup = () => {
                    calculateSizes();
                    p.createCanvas(canvasWidth, canvasHeight);
                    p.textFont('Yuji Syuku');
                    p.noLoop();
                };

                p.windowResized = () => {
                    calculateSizes();
                    p.resizeCanvas(canvasWidth, canvasHeight);
                    p.redraw();
                };

                const drawTexture = (room: Room) => {
                    room.cells.forEach(cellId => {
                        const coords = getPixelCoords(cellId, false);
                        if (!coords) return;
                        p.push();
                        p.translate(coords.x, coords.y);
                        p.clip(() => p.rect(0, 0, cellSize, cellSize));
                        p.strokeWeight(1);
                        p.stroke(0, 0, 0, 20); // Subtle texture lines
                        if (room.texture === 'tatami') {
                            for (let i = 0; i < cellSize; i += cellSize / 4) p.line(0, i, cellSize, i);
                        } else if (room.texture === 'shoji') {
                            for (let i = 0; i < cellSize; i += cellSize / 3) p.line(i, 0, i, cellSize);
                            for (let i = 0; i < cellSize; i += cellSize / 3) p.line(0, i, cellSize, i);
                        } else if (room.texture === 'wood') {
                             for (let i = 0; i < cellSize; i += cellSize / 5) p.line(i, 0, i-cellSize/2, cellSize);
                        } else if (room.texture === 'stone') {
                             p.noStroke();
                             for (let i = 0; i < 10; i++) {
                                 p.fill(0, 0, 0, 10 + Math.random() * 10);
                                 p.ellipse(p.random(cellSize), p.random(cellSize), p.random(5, 15));
                             }
                        }
                        p.pop();
                    });
                };
                
                p.draw = () => {
                    p.background('#1f2937'); 

                    p.stroke('#4b5563'); 
                    p.strokeWeight(1);
                    for (let i = 0; i <= MAP_COLUMNS.length; i++) p.line(headerSize + i * cellSize, headerSize, headerSize + i * cellSize, canvasHeight);
                    for (let i = 0; i <= MAP_ROWS.length; i++) p.line(headerSize, headerSize + i * cellSize, canvasWidth, headerSize + i * cellSize);

                    p.fill('#d1d5db');
                    p.textSize(Math.max(10, cellSize * 0.3));
                    p.textAlign(p.CENTER, p.CENTER);
                    p.noStroke();
                    for (let i = 0; i < MAP_COLUMNS.length; i++) p.text(MAP_COLUMNS[i], headerSize + (i + 0.5) * cellSize, headerSize / 2);
                    for (let i = 0; i < MAP_ROWS.length; i++) p.text(MAP_ROWS[i], headerSize / 2, headerSize + (i + 0.5) * cellSize);
                    
                    ROOM_LAYOUT.forEach(room => {
                        p.noStroke();
                        room.cells.forEach(cellId => {
                            const coords = getPixelCoords(cellId, false);
                            if (!coords) return;
                            
                            p.fill(0,0,0,50);
                            p.rect(coords.x+3, coords.y+3, cellSize, cellSize);

                            p.fill(room.color);
                            p.rect(coords.x, coords.y, cellSize, cellSize);
                        });
                        if (room.texture) drawTexture(room);
                    });
                    
                    ROOM_LAYOUT.forEach(room => {
                         if (room.labelCell) {
                            const coords = getPixelCoords(room.labelCell, false);
                            if (coords) {
                                p.fill(room.textColor || '#F3F4F6');
                                p.textSize(p.constrain(cellSize * 0.18, 8, 14));
                                p.textAlign(p.CENTER, p.CENTER);
                                p.text(room.name, coords.x, coords.y, cellSize, cellSize);
                            }
                        }
                    });

                    const xCoords = getPixelCoords('I8');
                    if (xCoords) {
                        p.stroke('#EF4444'); p.strokeWeight(cellSize * 0.1);
                        p.line(xCoords.x - cellSize/4, xCoords.y - cellSize/4, xCoords.x + cellSize/4, xCoords.y + cellSize/4);
                        p.line(xCoords.x + cellSize/4, xCoords.y - cellSize/4, xCoords.x - cellSize/4, xCoords.y + cellSize/4);
                    }

                    const drawPath = (path: string[], color: any, weight: number, isAnimated = false) => {
                        const pathCoords = path.map(cellId => getPixelCoords(cellId)).filter(c => c !== null) as {x: number, y: number}[];
                        if(pathCoords.length < 2) return;

                        let progress = 1;
                        if(isAnimated) {
                            const elapsed = p.millis() - solutionAnimationStartTime;
                            progress = p.constrain(elapsed / solutionDuration, 0, 1);
                        }
                        
                        p.stroke(color); p.strokeWeight(weight); p.strokeCap(p.ROUND); p.noFill();
                        
                        const totalSegments = pathCoords.length - 1;
                        const drawnSegments = totalSegments * progress;

                        for(let i = 0; i < p.floor(drawnSegments); i++) p.line(pathCoords[i].x, pathCoords[i].y, pathCoords[i+1].x, pathCoords[i+1].y);
                        
                        const lastSegmentProgress = drawnSegments - p.floor(drawnSegments);
                        if (p.floor(drawnSegments) < totalSegments) {
                            const i = p.floor(drawnSegments);
                            const start = p.createVector(pathCoords[i].x, pathCoords[i].y);
                            const end = p.createVector(pathCoords[i+1].x, pathCoords[i+1].y);
                            const partialEnd = p5.Vector.lerp(start, end, lastSegmentProgress);
                            p.line(start.x, start.y, partialEnd.x, partialEnd.y);
                        }
                        if (isAnimated && progress >= 1) p.noLoop();
                    };

                    drawPath(currentProps.quest3UserPath, 'rgba(52, 211, 153, 0.9)', Math.max(3, cellSize * 0.1));
                    
                    if (currentProps.showSolutions) {
                       drawPath(QUEST_3_PATH_SOLUTION, 'rgba(239, 68, 68, 0.9)', Math.max(4, cellSize * 0.12), true);
                    }
                };

                p.mousePressed = () => {
                    const cellId = getCellIdFromPixels(p.mouseX, p.mouseY);
                    if (cellId) {
                        currentProps.onMapClick(cellId);
                    }
                };
            };
            p5InstanceRef.current = new p5(sketch, containerRef.current);
        }
        return () => {
            p5InstanceRef.current?.remove();
            p5InstanceRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (p5InstanceRef.current) {
            p5InstanceRef.current.updateWithProps(props);
        }
    }, [props]);

    return <div ref={containerRef} className="w-full h-full rounded-lg shadow-xl border-4 border-amber-800/60 bg-slate-900 p-2 cursor-crosshair" />;
};
