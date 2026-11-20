import { describe, expect, it } from 'vitest'
import type { ITodoItem, TTodoColumns } from '../types/todo'
import { moveTodoToMainColumn, moveTodoToTypeColumn } from './todoColumns'

const apple: ITodoItem = { id: 'Fruit-Apple', type: 'Fruit', name: 'Apple' }
const banana: ITodoItem = { id: 'Fruit-Banana', type: 'Fruit', name: 'Banana' }
const carrot: ITodoItem = {
  id: 'Vegetable-Carrot',
  type: 'Vegetable',
  name: 'Carrot',
}

describe('moveTodoToTypeColumn', () => {
  it('removes the todo from main and creates its type column when missing', () => {
    const columns: TTodoColumns = { main: [apple, carrot] }

    const result = moveTodoToTypeColumn(columns, apple)

    expect(result).toEqual({ main: [carrot], Fruit: [apple] })
  })

  it('appends the todo to the end of an existing type column', () => {
    const columns: TTodoColumns = { main: [banana], Fruit: [apple] }

    const result = moveTodoToTypeColumn(columns, banana)

    expect(result.Fruit).toEqual([apple, banana])
  })

  it('keeps other columns as the same reference', () => {
    const vegetable = [carrot]
    const columns: TTodoColumns = { main: [apple], Vegetable: vegetable }

    const result = moveTodoToTypeColumn(columns, apple)

    expect(result.Vegetable).toBe(vegetable)
  })

  it('does not mutate the input columns', () => {
    const columns: TTodoColumns = { main: [apple, carrot], Fruit: [banana] }
    const snapshot = structuredClone(columns)

    moveTodoToTypeColumn(columns, apple)

    expect(columns).toEqual(snapshot)
  })
})

describe('moveTodoToMainColumn', () => {
  it('removes the todo from its type column and appends it to the end of main', () => {
    const columns: TTodoColumns = { main: [carrot], Fruit: [apple, banana] }

    const result = moveTodoToMainColumn(columns, apple)

    expect(result).toEqual({ main: [carrot, apple], Fruit: [banana] })
  })

  it('leaves an empty type column after moving its last todo', () => {
    const columns: TTodoColumns = { main: [], Fruit: [apple] }

    const result = moveTodoToMainColumn(columns, apple)

    expect(result.Fruit).toEqual([])
  })

  it('keeps other columns as the same reference', () => {
    const vegetable = [carrot]
    const columns: TTodoColumns = {
      main: [],
      Fruit: [apple],
      Vegetable: vegetable,
    }

    const result = moveTodoToMainColumn(columns, apple)

    expect(result.Vegetable).toBe(vegetable)
  })

  it('does not mutate the input columns', () => {
    const columns: TTodoColumns = { main: [carrot], Fruit: [apple, banana] }
    const snapshot = structuredClone(columns)

    moveTodoToMainColumn(columns, apple)

    expect(columns).toEqual(snapshot)
  })
})
