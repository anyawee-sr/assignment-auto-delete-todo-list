import Button from "./Button";
import type { ITodo } from "../App";
import styles from "./MainTodoColumn.module.css";

interface IMainTodoColumnProps {
  data: ITodo[];
  onClick: (todo: ITodo) => void;
}

const MainTodoColumn = ({ data, onClick }: IMainTodoColumnProps) =>
  <div className={styles.MainList}>
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