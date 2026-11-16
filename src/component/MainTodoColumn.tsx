import Button from "./Button";
import type { ITodo } from "../App";

interface IMainTodoColumnProps {
  data: ITodo[];
  onClick: (todo: ITodo) => void;
}

const MainTodoColumn = ({ data, onClick }: IMainTodoColumnProps) =>
  <div>
    {data.map((todo) => {
      const { type, name } = todo;

      return (
        <Button
          key={`${type}-${name}`}
          todo={todo}
          onClick={onClick}
        />
      )
    })}
  </div>


export default MainTodoColumn