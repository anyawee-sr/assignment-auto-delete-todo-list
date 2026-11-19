import type { ITodoItem } from '../types/todo'

const RAW_TODO_LIST: Omit<ITodoItem, 'id'>[] = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
]

export const TRANSFORMED_TODO_LIST: ITodoItem[] = RAW_TODO_LIST.map((todo) => ({
  ...todo,
  id: `${todo.type}-${todo.name}`,
}))

export const TYPES = [...new Set(RAW_TODO_LIST.map(({ type }) => type))]
