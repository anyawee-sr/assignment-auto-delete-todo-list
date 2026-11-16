import type { ITodo } from "../App";
import Button from "./Button";

interface ITodoColumnProps {
  data: ITodo[];
  onClick: (todo: ITodo) => void;
}

const TodoColumn = ({ data, onClick }: ITodoColumnProps) =>
  data.map((todo) => {
    const { type, name } = todo;

    return (
      <Button
        key={`${type}-${name}`}
        todo={todo}
        timeout={5000}
        onClick={onClick}
      />)
  })




export default TodoColumn