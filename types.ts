
export enum QuestType {
  INPUT_COORDS,
  INPUT_TEXT,
  REVEAL_PATH,
}

export interface Quest {
  id: number;
  title: string;
  text: string;
  type: QuestType;
  answer: string | string[];
  placeholder?: string;
  buttonText?: string;
}

export interface Room {
  name: string;
  cells: string[];
  color: string;
  textColor?: string;
  labelCell?: string;
}
