import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ITodoItem } from '../types/todo'
import TodoList from './TodoList'

const apple: ITodoItem = { id: 'Fruit-Apple', type: 'Fruit', name: 'Apple' }
const banana: ITodoItem = { id: 'Fruit-Banana', type: 'Fruit', name: 'Banana' }

describe('TodoList', () => {
  it('renders a button for each todo in list order', () => {
    render(<TodoList todoList={[banana, apple]} onClick={vi.fn()} />)

    const buttons = screen.getAllByRole('button')

    expect(buttons.map((button) => button.textContent)).toEqual([
      'Banana',
      'Apple',
    ])
  })

  it('calls onClick with the clicked todo', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<TodoList todoList={[apple, banana]} onClick={handleClick} />)

    await user.click(screen.getByRole('button', { name: 'Banana' }))

    expect(handleClick).toHaveBeenCalledExactlyOnceWith(banana)
  })

  it('renders no buttons when the list is empty', () => {
    render(<TodoList todoList={[]} onClick={vi.fn()} />)

    expect(screen.queryAllByRole('button')).toEqual([])
  })
})
