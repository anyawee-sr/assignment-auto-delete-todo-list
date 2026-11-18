export interface ITodoItem {
  type: string;
  name: string;
}

export type TTodoState = { main: ITodoItem[] } & Partial<Record<string, ITodoItem[]>>
