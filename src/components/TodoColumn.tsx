import type { ITodoItem } from '../types/todo'
import TodoItemButton from './TodoItemButton'
import styles from './TodoColumn.module.css'
import { memo, useId } from 'react'

interface ITodoColumnProps {
  todoList: ITodoItem[]
  onClick: (todo: ITodoItem) => void
  title?: string
  ariaLabel?: string
}

const TodoColumn = memo(
  ({ todoList, onClick, title, ariaLabel }: ITodoColumnProps) => {
    const headingId = useId()

    return (
      <section
        className={title ? styles.column : styles.list}
        aria-labelledby={title ? headingId : undefined}
        aria-label={title ? undefined : ariaLabel}
      >
        {title && (
          <div className={styles.columnHeader}>
            <h3 id={headingId}>{title}</h3>
          </div>
        )}

        {todoList.map((todoItem) => (
          <TodoItemButton key={todoItem.id} todo={todoItem} onClick={onClick} />
        ))}
      </section>
    )
  },
)

export default TodoColumn
