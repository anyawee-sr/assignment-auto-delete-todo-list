import type { ITodoItem } from '../types/todo'
import styles from './TodoTypeColumn.module.css'
import { memo, useId } from 'react'
import TodoList from './TodoList'

interface ITodoTypeColumnProps {
  todoList: ITodoItem[]
  onClick: (todo: ITodoItem) => void
  title: string
}

const TodoTypeColumn = memo(
  ({ todoList, onClick, title }: ITodoTypeColumnProps) => {
    const headingId = useId()

    return (
      <section className={styles.column} aria-labelledby={headingId}>
        <div className={styles.columnHeader}>
          <h3 id={headingId}>{title}</h3>
        </div>

        <TodoList todoList={todoList} onClick={onClick} />
      </section>
    )
  },
)

export default TodoTypeColumn
