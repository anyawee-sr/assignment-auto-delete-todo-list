import type { ITodoItem } from "../types/todo";
import styles from "./Button.module.css";

interface IButtonProps {
  todo: ITodoItem;
  onClick: (todo: ITodoItem) => void;
  timeout?: number;
}

const Button = ({ todo, onClick }: IButtonProps) => {
  const handleClickButton = () => {
    onClick(todo)
  }

  return (
    <button className={styles.textButton} onClick={handleClickButton} >
      {todo.name}
    </button>
  )
}

export default Button