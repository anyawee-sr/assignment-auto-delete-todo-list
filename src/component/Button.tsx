import { useEffect } from "react";
import type { ITodo } from "../App";

interface ITodoColumnButtonProps {
  todo: ITodo;
  onClick: (todo: ITodo) => void;
  timeout?: number;
}

const Button = ({ todo, onClick, timeout }: ITodoColumnButtonProps) => {
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
    <button style={{ width: "100%", backgroundColor: "red" }} onClick={() => onClick(todo)} >
      <h3>{name}</h3>
    </button>
  )
}

export default Button