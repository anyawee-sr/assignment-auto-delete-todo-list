import type { ITodo } from "../App";
import Button from "./Button";
import styles from "./TodoColumn.module.css";

interface ITodoColumnProps {
  data: ITodo[];
  onClick: (todo: ITodo) => void;
  title?: string;
}

const TodoColumn = ({ data, onClick, title }: ITodoColumnProps) =>

  <div className={title ? styles.column : styles.list}>
    {title && (
      <div className={styles.columnHeader}>
        <h3>{title}</h3>
      </div>
    )}

    {data.map((todo) => {
      const { type, name } = todo;

      return (

        <Button
          key={`${type}-${name}`}
          todo={todo}
          timeout={5000}
          onClick={onClick}
        />
      )
    })}
  </div>





export default TodoColumn