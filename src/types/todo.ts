export interface ITodoItem {
  id: string;
  type: string;
  name: string;
}

export type TTodoColumns = { main: ITodoItem[] } & Partial<Record<string, ITodoItem[]>>
