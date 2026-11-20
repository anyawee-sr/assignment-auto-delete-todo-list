export interface ITodoItem {
  id: string
  type: string
  name: string
}

export type TRawTodoItem = Omit<ITodoItem, 'id'>

export type TTodoColumns = { main: ITodoItem[] } & Partial<
  Record<string, ITodoItem[]>
>
