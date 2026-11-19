import { useCallback, useEffect, useRef, useState } from 'react';
import TodoColumn from './components/TodoColumn';
import styles from './App.module.css';
import type { ITodoItem, TTodoColumns } from './types/todo';
import { TRANSFORMED_TODO_LIST, TYPES } from './data/mockTodoList';
import { EMPTY_TODO_LIST, moveTodoToMainColumn, moveTodoToTypeColumn } from './utils/todoColumns';

const INITIAL_TODO_COLUMNS: TTodoColumns = {
  main: TRANSFORMED_TODO_LIST,
}

const AUTO_MOVE_DELAY_MS = 5000

const App = () => {
  const [todoColumns, setTodoColumns] = useState<TTodoColumns>(INITIAL_TODO_COLUMNS)

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const moveToMain = useCallback((todo: ITodoItem) => {
    const { id } = todo;

    clearTimeout(timersRef.current.get(id))
    timersRef.current.delete(id)

    setTodoColumns((prev) => moveTodoToMainColumn(prev, todo))
  }, [])

  const handleClickMainTodo = useCallback((todo: ITodoItem) => {
    setTodoColumns((prev) => moveTodoToTypeColumn(prev, todo))

    timersRef.current.set(todo.id, setTimeout(() => moveToMain(todo), AUTO_MOVE_DELAY_MS))
  }, [moveToMain])



  useEffect(() => {
    const timers = timersRef.current;

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className={styles.container}>
      <TodoColumn ariaLabel="Main list" todoList={todoColumns.main} onClick={handleClickMainTodo} />

      {TYPES.map((type) => (
        <TodoColumn
          key={type}
          title={type}
          todoList={todoColumns[type] ?? EMPTY_TODO_LIST}
          onClick={moveToMain}
        />
      ))}
    </div>
  )
}

export default App
