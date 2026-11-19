import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

const getButtonNames = (regionName: string) =>
  within(screen.getByRole('region', { name: regionName }))
    .queryAllByRole('button')
    .map((button) => button.textContent)

const clickTodo = (regionName: string, todoItemName: string) =>
  fireEvent.click(within(screen.getByRole('region', { name: regionName })).getByRole('button', { name: todoItemName }))

const advanceTime = (ms: number) => act(() => {
  vi.advanceTimersByTime(ms)
})

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('moves a clicked todo from main list to its type column', () => {
    render(<App />)

    clickTodo('Main list', 'Apple')

    expect(getButtonNames('Main list')).not.toContain('Apple')
    expect(getButtonNames('Fruit')).toEqual(['Apple'])
  })

  it('moves the todo back to the end of main list after 5 seconds', () => {
    render(<App />)
    clickTodo('Main list', 'Apple')

    advanceTime(4999)
    const fruitBeforeDelay = getButtonNames('Fruit')
    advanceTime(1)

    expect(fruitBeforeDelay).toEqual(['Apple'])
    expect(getButtonNames('Fruit')).toEqual([])
    expect(getButtonNames('Main list').at(-1)).toBe('Apple')
  })

  it('appends todos to the end of their type column', () => {
    render(<App />)

    clickTodo('Main list', 'Apple')
    clickTodo('Main list', 'Banana')

    expect(getButtonNames('Fruit')).toEqual(['Apple', 'Banana'])
  })

  it('moves the todo back immediately and cancels its timer when clicked in its type column', () => {
    render(<App />)
    clickTodo('Main list', 'Apple')
    advanceTime(1000)

    clickTodo('Fruit', 'Apple')
    const timerCount = vi.getTimerCount()
    advanceTime(5000)

    expect(timerCount).toBe(0)
    expect(getButtonNames('Fruit')).toEqual([])
    expect(getButtonNames('Main list').filter((name) => name === 'Apple')).toEqual(['Apple'])
    expect(getButtonNames('Main list').at(-1)).toBe('Apple')
  })

  it('runs a separate timer for each todo', () => {
    render(<App />)
    clickTodo('Main list', 'Apple')
    advanceTime(2000)
    clickTodo('Main list', 'Banana')

    advanceTime(3000)
    const fruitAtFiveSeconds = getButtonNames('Fruit')
    advanceTime(2000)

    expect(fruitAtFiveSeconds).toEqual(['Banana'])
    expect(getButtonNames('Fruit')).toEqual([])
    expect(getButtonNames('Main list').slice(-2)).toEqual(['Apple', 'Banana'])
  })

  it('clears pending timers on unmount', () => {
    const { unmount } = render(<App />)
    clickTodo('Main list', 'Apple')
    clickTodo('Main list', 'Tomato')

    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
