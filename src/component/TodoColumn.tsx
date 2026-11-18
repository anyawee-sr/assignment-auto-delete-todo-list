import type { ITodoItem } from "../types/todo";
import TodoItemButton from "./TodoItemButton";
import styles from "./TodoColumn.module.css";

interface ITodoColumnProps {
  data: ITodoItem[];
  onClick: (todo: ITodoItem) => void;
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

        <TodoItemButton
          key={`${type}-${name}`}
          todo={todo}
          onClick={onClick}
        />
      )
    })}
  </div>





export default TodoColumn