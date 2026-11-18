import type { ITodoItem } from "../types/todo";
import styles from "./TodoItemButton.module.css";

interface ITodoItemButtonProps {
  todo: ITodoItem;
  onClick: (todo: ITodoItem) => void;
}

const TodoItemButton = ({ todo, onClick }: ITodoItemButtonProps) => {
  const handleClickButton = () => {
    onClick(todo)
  }

  return (
    <button className={styles.textButton} onClick={handleClickButton} >
      {todo.name}
    </button>
  )
}

export default TodoItemButton