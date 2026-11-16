import TodoColumnButton from "./TodoColumnButton";
import type { ITodo } from "../App";

interface IFruitTodoListProps {
  data: ITodo[];
  onClick: (todo: ITodo) => void;
}

const TodoColumn = ({ data, onClick }: IFruitTodoListProps) =>
  data.map((todo) => {
    const { type, name } = todo;

    return (
      <TodoColumnButton
        key={`${type}-${name}`}
        todo={todo}
        onClick={onClick}
      />)
  })




export default TodoColumn