import { useEffect } from "react";
import type { ITodo } from "../App";
import styles from "./Button.module.css";

interface IButtonProps {
  todo: ITodo;
  onClick: (todo: ITodo) => void;
  timeout?: number;
}

const Button = ({ todo, onClick, timeout }: IButtonProps) => {
  const { name } = todo;

  useEffect(() => {
    if (timeout === undefined) {
      return
    }

    const timer = setTimeout(() => { onClick(todo) }, timeout);

    return () => {
      clearTimeout(timer);
    }
  }, [onClick, todo, timeout]);

  return (
    <button className={styles.textButton} onClick={() => onClick(todo)} >
      {name}
    </button>
  )
}

export default Button