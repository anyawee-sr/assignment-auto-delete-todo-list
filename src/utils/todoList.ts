import type { ITodoItem, TRawTodoItem } from '../types/todo'

export const transformTodoList = (rawList: TRawTodoItem[]): ITodoItem[] =>
  rawList.map((todo) => ({
    ...todo,
    id: `${todo.type}-${todo.name}`,
  }))

export const getTodoTypeList = (rawList: TRawTodoItem[]): string[] => [
  ...new Set(rawList.map(({ type }) => type)),
]
