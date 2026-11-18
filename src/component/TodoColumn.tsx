import type { ITodoItem } from "../types/todo";
import TodoItemButton from "./TodoItemButton";
import styles from "./TodoColumn.module.css";

interface ITodoColumnProps {
  todoList: ITodoItem[];
  onClick: (todo: ITodoItem) => void;
  title?: string;
}

const TodoColumn = ({ todoList, onClick, title }: ITodoColumnProps) =>

  <div className={title ? styles.column : styles.list}>
    {title && (
      <div className={styles.columnHeader}>
        <h3>{title}</h3>
      </div>
    )}

    {todoList.map((todoItem) => {
      const { type, name } = todoItem;

      return (

        <TodoItemButton
          key={`${type}-${name}`}
          todo={todoItem}
          onClick={onClick}
        />
      )
    })}
  </div>





export default TodoColumn