import { Quest, Cell, QuestInputType, CellType } from './types';

export const GRID_ROWS = 10;
export const GRID_COLS = 14;

export const PASSWORD_B64 = 'Q2ViQ2hhbXBpb24=';

export const GRID_MAP: Cell[] = [
    // Row 1
    { id: 'B1', type: CellType.DOJO, label: 'Dojo', colSpan: 2, door: 'S' },
    { id: 'D1', type: CellType.UBUYASHIKI_RESIDENCE, label: "Résidence d'Ubuyashiki", door: 'S' },
    { id: 'F1', type: CellType.BUTTERFLY_MANSION, label: 'Domaine des Papillons', colSpan: 3, door: 'S' },
    { id: 'I1', type: CellType.FINAL_SELECTION_MOUNTAIN, label: 'Sélection Finale', colSpan: 3, door: 'S' },
    { id: 'L1', type: CellType.STABLES, label: 'Écuries', colSpan: 2, rowSpan: 2, door: 'W' },

    // Row 2
    { id: 'C2', type: CellType.PATH },
    { id: 'D2', type: CellType.PATH },
    { id: 'E2', type: CellType.PATH },
    { id: 'F2', type: CellType.PATH },
    { id: 'G2', type: CellType.PATH },
    { id: 'H2', type: CellType.PATH },
    { id: 'I2', type: CellType.PATH },
    { id: 'J2', type: CellType.PATH },

    // Row 3
    { id: 'B3', type: CellType.ONSEN, label: 'Onsen', rowSpan: 2, door: 'E' },
    { id: 'C3', type: CellType.PATH },
    { id: 'D3', type: CellType.SOBA_SHOP, label: 'Restaurant de Soba', colSpan: 4, door: 'W' },
    { id: 'I3', type: CellType.RECOVERY_ROOM, label: 'Salle de Récupération', colSpan: 2, door: 'S' },
    { id: 'K3', type: CellType.PATH },

    // Row 4
    { id: 'C4', type: CellType.PATH },
    { id: 'D4', type: CellType.PATH },
    { id: 'E4', type: CellType.PATH },
    { id: 'F4', type: CellType.PATH },
    { id: 'G4', type: CellType.PATH },
    { id: 'H4', type: CellType.PATH },
    { id: 'I4', type: CellType.PATH },
    { id: 'J4', type: CellType.PATH },
    { id: 'K4', type: CellType.GATE, label: 'Porte' },

    // Row 5
    { id: 'B5', type: CellType.TRAINING_AREA, label: "Zone de Tanjiro", door: 'E' },
    { id: 'C5', type: CellType.PATH },
    { id: 'D5', type: CellType.COURTYARD, label: 'Cour', colSpan: 4, rowSpan: 5, door: 'W' },
    { id: 'I5', type: CellType.PATH },
    { id: 'J5', type: CellType.INFINITY_CASTLE, label: 'Forteresse Infinie', colSpan: 2, rowSpan: 3, door: 'W' },

    // Row 6
    { id: 'B6', type: CellType.TRAINING_AREA, label: "Zone de Zenitsu", door: 'E' },
    { id: 'C6', type: CellType.PATH },
    { id: 'I6', type: CellType.PATH },
    { id: 'L6', type: CellType.WISTERIA_GARDEN, label: 'Jardin de Glycines', colSpan: 2, rowSpan: 2, door: 'W' },

    // Row 7
    { id: 'B7', type: CellType.TRAINING_AREA, label: "Zone d'Inosuke", door: 'E' },
    { id: 'C7', type: CellType.PATH },
    { id: 'H7', type: CellType.PATH },
    { id: 'I7', type: CellType.PATH },
    
    // Row 8
    { id: 'B8', type: CellType.TRAINING_AREA, label: "Zone de Kanao", door: 'E' },
    { id: 'C8', type: CellType.PATH },
    { id: 'H8', type: CellType.PATH },
    { id: 'I8', type: CellType.PATH },
    
    // Row 9
    { id: 'B9', type: CellType.ARCHIVES, label: 'Archives', door: 'E' },
    { id: 'C9', type: CellType.PATH },
    { id: 'H9', type: CellType.PATH },
    { id: 'I9', type: CellType.PATH },
    
    // Row 10
    { id: 'D10', type: CellType.GATE, label: 'Porte' },
    { id: 'I10', type: CellType.HASHIRA_MEETING_HALL, label: 'Salle des Piliers', door: 'N' },

    // Rally Point
    { id: 'M4', type: CellType.RALLY_POINT }
];


export const QUESTS_DATA: Quest[] = [
  {
    id: 1,
    title: "Quête 1 : Le plus court chemin",
    description: "Lors d'une alerte démoniaque, les Piliers dans leur salle de réunion (I10) doivent se replier vers la zone de sécurité Symbole du Soleil (M4). Ils doivent suivre le chemin le plus court. Transcrivez les coordonnées du chemin qu'ils emprunteront, séparées par des virgules.",
    inputType: QuestInputType.TEXT,
    placeholder: "ex: B4,B3,...",
  },
  {
    id: 2,
    title: "Quête 2 : Le poste d'un nouveau pourfendeur",
    description: "Un nouveau Pourfendeur de démons est arrivé. Guidez-le depuis ma résidence (Résidence d'Ubuyashiki). Voici ses instructions : « En sortant de ma residence, prenez à la droite puis tournez immédiatement à gauche dans le long couloir. Avancez et prenez le couloir sur votre gauche. Avancez et prenez le couloir sur votre droite. Le local se trouve au bout de ce couloir. »",
    inputType: QuestInputType.TEXT,
    placeholder: "Nom de la salle à trouver",
  },
  {
    id: 3,
    title: "Quête 3 : La piste du corbeau",
    description: "Un corbeau Kasugai a laissé une piste. Son rapport indique le trajet suivant : C7, C6, D6, E6, E5, E4, F4, G4, H4, I4, I3. Retracez son parcours exact sur la carte en cliquant sur les cases dans le bon ordre, puis validez votre tracé.",
    inputType: QuestInputType.BUTTON,
  },
  {
    id: 4,
    title: "Quête 4 : Le périmètre des glycines",
    description: "Le Jardin de Glycines protège le corps des démons. Notez toutes les coordonnées de la grille que le jardin occupe, séparées par des virgules.",
    inputType: QuestInputType.TEXTAREA,
  },
];

export const CORRECT_ANSWERS: { [key: number]: string } = {
  1: "i10,i9,i8,i7,i6,i5,i4,j4,k4,l4,m4",
  2: "salledespiliers",
  3: "c7,c6,d6,e6,e5,e4,f4,g4,h4,i4,i3",
  4: "l6,m6,l7,m7",
};

export const CROW_PATH_COORDS = ['C7', 'C6', 'D6', 'E6', 'E5', 'E4', 'F4', 'G4', 'H4', 'I4', 'I3'];