import { describe, expect, it } from 'vitest'
import type { TRawTodoItem } from '../types/todo'
import { getTodoTypeList, transformTodoList } from './todoList'

const apple: TRawTodoItem = { type: 'Fruit', name: 'Apple' }
const carrot: TRawTodoItem = { type: 'Vegetable', name: 'Carrot' }
const banana: TRawTodoItem = { type: 'Fruit', name: 'Banana' }

describe('transformTodoList', () => {
  it('adds an id built from type and name to each todo', () => {
    const result = transformTodoList([apple, carrot])

    expect(result).toEqual([
      { id: 'Fruit-Apple', type: 'Fruit', name: 'Apple' },
      { id: 'Vegetable-Carrot', type: 'Vegetable', name: 'Carrot' },
    ])
  })

  it('returns an empty list for an empty input', () => {
    expect(transformTodoList([])).toEqual([])
  })

  it('does not mutate the input list', () => {
    const rawList = [apple, carrot]
    const snapshot = structuredClone(rawList)

    transformTodoList(rawList)

    expect(rawList).toEqual(snapshot)
  })
})

describe('getTodoTypeList', () => {
  it('lists each type once in order of first appearance', () => {
    const result = getTodoTypeList([apple, carrot, banana])

    expect(result).toEqual(['Fruit', 'Vegetable'])
  })

  it('returns an empty list for an empty input', () => {
    expect(getTodoTypeList([])).toEqual([])
  })
})
