import { describe, expect, it } from 'vitest'
import { RAW_TODO_LIST } from './rawTodoList'

describe('RAW_TODO_LIST', () => {
  it('has a unique type and name pair for each todo', () => {
    const keys = RAW_TODO_LIST.map(({ type, name }) => `${type}-${name}`)

    const uniqueKeys = new Set(keys)

    expect(uniqueKeys.size).toBe(keys.length)
  })
})
