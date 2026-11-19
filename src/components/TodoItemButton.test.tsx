import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ITodoItem } from '../types/todo'
import TodoItemButton from './TodoItemButton'

const apple: ITodoItem = { id: 'Fruit-Apple', type: 'Fruit', name: 'Apple' }

describe('TodoItemButton', () => {
  it('renders a button named after the todo', () => {
    render(<TodoItemButton todo={apple} onClick={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument()
  })

  it('calls onClick with the todo when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<TodoItemButton todo={apple} onClick={handleClick} />)

    await user.click(screen.getByRole('button', { name: 'Apple' }))

    expect(handleClick).toHaveBeenCalledExactlyOnceWith(apple)
  })
})
