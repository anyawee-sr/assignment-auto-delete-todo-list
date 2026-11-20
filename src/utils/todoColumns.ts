import { EMPTY_TODO_LIST } from '../constants/todo'
import type { ITodoItem, TTodoColumns } from '../types/todo'

export const moveTodoToMainColumn = (
  columns: TTodoColumns,
  todo: ITodoItem,
): TTodoColumns => {
  const { id, type } = todo

  return {
    ...columns,
    main: [...columns.main, todo],
    [type]: (columns[type] ?? EMPTY_TODO_LIST).filter((item) => item.id !== id),
  }
}

export const moveTodoToTypeColumn = (
  columns: TTodoColumns,
  todo: ITodoItem,
): TTodoColumns => {
  const { id, type } = todo

  return {
    ...columns,
    main: columns.main.filter((item) => item.id !== id),
    [type]: [...(columns[type] ?? EMPTY_TODO_LIST), todo],
  }
}
