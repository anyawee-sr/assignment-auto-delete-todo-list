import type { ITodoItem } from '../types/todo'
import TodoItemButton from './TodoItemButton'
import styles from './TodoList.module.css'

interface ITodoListProps {
  todoList: ITodoItem[]
  onClick: (todo: ITodoItem) => void
}

const TodoList = ({ todoList, onClick }: ITodoListProps) => {
  return (
    <div className={styles.content}>
      {todoList.map((todoItem) => (
        <TodoItemButton key={todoItem.id} todo={todoItem} onClick={onClick} />
      ))}
    </div>
  )
}

export default TodoList
