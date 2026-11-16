import { useEffect } from "react";
import type { ITodo } from "../App";

interface ITodoColumnButtonProps {
  todo: ITodo;
  onClick: (todo: ITodo) => void;
}

const TodoColumnButton = ({ todo, onClick }: ITodoColumnButtonProps) => {
  const { name } = todo;

  useEffect(() => {
    const timer = setTimeout(() => { onClick(todo) }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, [onClick, todo]);

  return (
    <button style={{ width: "100%", backgroundColor: "red" }} onClick={() => onClick(todo)} >
      <h3>{name}</h3>
    </button>
  )
}

export default TodoColumnButton