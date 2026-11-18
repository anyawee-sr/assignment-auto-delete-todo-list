export interface ITodo {
  type: string;
  name: string;
}

export type TTodoState = { main: ITodo[] } & Partial<Record<string, ITodo[]>>
