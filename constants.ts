
import { Quest, QuestType, Room } from './types';

export const MAP_COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
export const MAP_ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

export const ROOM_LAYOUT: Room[] = [
  { name: "Dojo d'entraînement", cells: ['A1', 'B1', 'H1', 'I1', 'C5', 'D5', 'A6', 'B6', 'A7', 'B7'], color: 'rgba(127, 29, 29, 0.7)', textColor: '#F3F4F6', labelCell: 'A6', texture: 'tatami' },
  { name: 'Résidence de Kagaya Ubuyashiki', cells: ['C1', 'D1', 'E1'], color: 'rgba(107, 33, 168, 0.8)', textColor: '#F3F4F6', labelCell: 'D1', texture: 'shoji' },
  { name: 'Domaine des Papillons', cells: ['F1', 'G1'], color: 'rgba(244, 114, 182, 0.7)', textColor: '#F3F4F6', labelCell: 'F1', texture: 'shoji' },
  { name: 'Jardin de Glycines', cells: ['J1','K1','L1','M1','J2','K2','L2','M2','J3','K3','L3','M3'], color: 'rgba(124, 58, 237, 0.6)', textColor: '#F3F4F6', labelCell: 'K2', texture: 'stone' },
  { name: 'Réfectoire du Corps', cells: ['D3', 'E3', 'F3', 'G3'], color: 'rgba(180, 83, 9, 0.7)', textColor: '#F3F4F6', labelCell: 'E3', texture: 'wood' },
  { name: 'Dortoirs des Pourfendeurs', cells: ['H3', 'I3'], color: 'rgba(22, 78, 99, 0.7)', textColor: '#F3F4F6', labelCell: 'H3', texture: 'tatami' },
  { name: "Cour d'entraînement extérieure", cells: ['D6', 'E6', 'F6', 'G6', 'H6', 'I6', 'D7', 'E7', 'G7', 'H7', 'I7', 'D8', 'E8', 'F8', 'I8'], color: 'rgba(22, 101, 52, 0.6)', textColor: '#F3F4F6', labelCell: 'F6', texture: 'stone' },
  { name: 'Salle de stratégie', cells: ['G8', 'H8'], color: 'rgba(30, 58, 138, 0.8)', textColor: '#F3F4F6', labelCell: 'G8', texture: 'tatami' },
  { name: 'Zone de la Sélection Finale', cells: ['J6','K6','L6','J7','K7','L7','J8','L8'], color: 'rgba(68, 64, 60, 0.8)', textColor: '#F3F4F6', labelCell: 'K7', texture: 'wood' },
  { name: 'Archives du Corps', cells: ['B9', 'C9'], color: 'rgba(124, 45, 18, 0.7)', textColor: '#F3F4F6', labelCell: 'B9', texture: 'wood' },
  { name: 'WC', cells: ['C2', 'I5', 'F7'], color: 'rgba(75, 85, 99, 0.7)', textColor: '#F3F4F6' },
];

export const QUESTS: Quest[] = [
  {
    id: 1,
    title: 'Quête 1 : Alerte Intrusion',
    text: "Alerte ! Un démon a pénétré le périmètre ! Tu es dans la Salle de stratégie (H8). Rejoins le point de défense dans la Cour d'entraînement (croix en I8) par le chemin le plus court ! COMPLÈTE les coordonnées de ta course. Le chemin débute en I7.",
    type: QuestType.INPUT_COORDS,
    answer: "I7-H7-H8",
    placeholder: 'I7 - ...'
  },
  {
    id: 2,
    title: 'Quête 2 : Ordre du Maître',
    text: "Kagaya Ubuyashiki te mande. Son corbeau te guide : « Depuis la Résidence du Maître (D1), tourne à gauche. Avance et prends le couloir de gauche. Le dojo se trouve immédiatement sur ta gauche. » ÉCRIS le nom de ce lieu.",
    type: QuestType.INPUT_TEXT,
    answer: "Dojo d'entraînement",
    placeholder: "Nom du lieu..."
  },
  {
    id: 3,
    title: 'Quête 3 : La Piste du Corbeau',
    text: "Un corbeau de liaison a tracé un chemin de vol pour une mission secrète. Ses coordonnées sont : C7 – C6 – D6 – E6 – E5 – E4 – G4 – H4 – I4 – I3. TRACE sa trajectoire sur la carte en cliquant sur les cases dans le bon ordre.",
    type: QuestType.TRACE_PATH,
    answer: ['C7', 'C6', 'D6', 'E6', 'E5', 'E4', 'G4', 'H4', 'I4', 'I3'],
  },
  {
    id: 4,
    title: 'Quête 4 : La Potion de Shinobu',
    text: "Pour créer un poison anti-démon, Shinobu Kocho a besoin de fleurs spéciales. ÉCRIS les coordonnées de toutes les parcelles du Jardin de Glycines.",
    type: QuestType.INPUT_TEXT,
    answer: "J1-K1-L1-M1-J2-K2-L2-M2-J3-K3-L3-M3",
    placeholder: "J1 - K1 - ..."
  }
];

export const SOLUTIONS: { [key: number]: string } = {
  1: "I7 – H7 – H8",
  2: "Dojo d'entraînement",
  3: "Le chemin correct est affiché sur la carte.",
  4: "J1 - K1 - L1 - M1 - J2 - K2 - L2 - M2 - J3 - K3 - L3 - M3",
};

export const ENCODED_PASSWORD = 'Q2ViQ2hhbXBpb24='; // "CebChampion"
