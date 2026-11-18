export interface ITodoItem {
  type: string;
  name: string;
}

export type TTodoColumns = { main: ITodoItem[] } & Partial<Record<string, ITodoItem[]>>
