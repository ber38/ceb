
export enum QuestInputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  BUTTON = 'button',
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  inputType: QuestInputType;
  placeholder?: string;
}

export enum CellType {
  EMPTY = 'EMPTY',
  WALL = 'WALL',
  PATH = 'PATH',
  DOJO = 'DOJO',
  UBUYASHIKI_RESIDENCE = 'UBUYASHIKI_RESIDENCE',
  BUTTERFLY_MANSION = 'BUTTERFLY_MANSION',
  FINAL_SELECTION_MOUNTAIN = 'FINAL_SELECTION_MOUNTAIN',
  STABLES = 'STABLES',
  SOBA_SHOP = 'SOBA_SHOP',
  RECOVERY_ROOM = 'RECOVERY_ROOM',
  ONSEN = 'ONSEN',
  TRAINING_AREA = 'TRAINING_AREA',
  COURTYARD = 'COURTYARD',
  HASHIRA_MEETING_HALL = 'HASHIRA_MEETING_HALL',
  INFINITY_CASTLE = 'INFINITY_CASTLE',
  ARCHIVES = 'ARCHIVES',
  WISTERIA_GARDEN = 'WISTERIA_GARDEN',
  GATE = 'GATE',
  RALLY_POINT = 'RALLY_POINT',
}

export interface Cell {
  id: string;
  type: CellType;
  label?: string;
  colSpan?: number;
  rowSpan?: number;
  door?: 'N' | 'S' | 'E' | 'W';
}