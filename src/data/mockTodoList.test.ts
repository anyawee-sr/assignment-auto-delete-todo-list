import { describe, expect, it } from 'vitest'
import { TRANSFORMED_TODO_LIST, TYPES } from './mockTodoList'

describe('TRANSFORMED_TODO_LIST', () => {
  it('builds each id from its type and name', () => {
    const mismatched = TRANSFORMED_TODO_LIST.filter(
      ({ id, type, name }) => id !== `${type}-${name}`,
    )

    expect(mismatched).toEqual([])
  })

  it('has unique ids', () => {
    const ids = TRANSFORMED_TODO_LIST.map(({ id }) => id)

    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(ids.length)
  })
})

describe('TYPES', () => {
  it('lists each todo type once in order of first appearance', () => {
    expect(TYPES).toEqual(['Fruit', 'Vegetable'])
  })

  it('covers the type of every todo', () => {
    const missing = TRANSFORMED_TODO_LIST.filter(
      ({ type }) => !TYPES.includes(type),
    )

    expect(missing).toEqual([])
  })
})
