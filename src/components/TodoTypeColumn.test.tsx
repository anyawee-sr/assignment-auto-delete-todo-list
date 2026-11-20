import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ITodoItem } from '../types/todo'
import TodoTypeColumn from './TodoTypeColumn'

const apple: ITodoItem = { id: 'Fruit-Apple', type: 'Fruit', name: 'Apple' }
const banana: ITodoItem = { id: 'Fruit-Banana', type: 'Fruit', name: 'Banana' }

describe('TodoTypeColumn', () => {
  it('names the region after its title and shows the title as a heading', () => {
    render(<TodoTypeColumn title="Fruit" todoList={[]} onClick={vi.fn()} />)

    const region = screen.getByRole('region', { name: 'Fruit' })

    expect(
      within(region).getByRole('heading', { name: 'Fruit', level: 3 }),
    ).toBeInTheDocument()
  })

  it('renders a button for each todo in list order', () => {
    render(
      <TodoTypeColumn
        title="Fruit"
        todoList={[banana, apple]}
        onClick={vi.fn()}
      />,
    )

    const buttons = within(
      screen.getByRole('region', { name: 'Fruit' }),
    ).getAllByRole('button')

    expect(buttons.map((button) => button.textContent)).toEqual([
      'Banana',
      'Apple',
    ])
  })

  it('calls onClick with the clicked todo', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <TodoTypeColumn
        title="Fruit"
        todoList={[apple, banana]}
        onClick={handleClick}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Banana' }))

    expect(handleClick).toHaveBeenCalledExactlyOnceWith(banana)
  })

  it('renders the region without buttons when the list is empty', () => {
    render(<TodoTypeColumn title="Fruit" todoList={[]} onClick={vi.fn()} />)

    const region = screen.getByRole('region', { name: 'Fruit' })

    expect(within(region).queryAllByRole('button')).toEqual([])
  })
})
