
export enum QuestType {
  INPUT_COORDS,
  INPUT_TEXT,
  TRACE_PATH, // Formerly REVEAL_PATH
}

export interface Quest {
  id: number;
  title: string;
  text: string;
  type: QuestType;
  answer: string | string[];
  placeholder?: string;
}

export interface Room {
  name: string;
  cells: string[];
  color: string;
  textColor?: string;
  labelCell?: string;
  texture?: 'tatami' | 'shoji' | 'stone' | 'wood';
}
