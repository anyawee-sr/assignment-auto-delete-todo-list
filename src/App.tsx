import { useCallback, useEffect, useRef, useState } from 'react';
import TodoColumn from './component/TodoColumn';
import styles from './App.module.css';
import type { ITodoItem, TTodoColumns } from './types/todo';
import { TRANSFORMED_TODO_LIST, TYPES } from './data/mockTodoList';

const INITIAL_TODO_COLUMNS: TTodoColumns = {
  main: TRANSFORMED_TODO_LIST,
}

const App = () => {
  const [todoColumns, setTodoColumns] = useState<TTodoColumns>(INITIAL_TODO_COLUMNS)

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const moveToMain = useCallback((todo: ITodoItem) => {
    const { id, type } = todo;

    clearTimeout(timersRef.current.get(id))
    timersRef.current.delete(id)

    setTodoColumns((prev) => (
      {
        ...prev,
        main: [...prev.main, todo],
        [type]: (prev[type] ?? []).filter((item) => item.id !== id)
      }
    ))
  }, [])

  const handleClickMainTodo = useCallback((todo: ITodoItem) => {
    const { id, type } = todo;

    setTodoColumns((prev) => (
      {
        ...prev,
        main: prev.main.filter((item) => item.id !== id),
        [type]: [...(prev[type] ?? []), todo]
      })
    )

    timersRef.current.set(id, setTimeout(() => moveToMain(todo), 5000))
  }, [moveToMain])



  useEffect(() => {
    const timers = timersRef.current;

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className={styles.container}>
      <TodoColumn todoList={todoColumns.main} onClick={handleClickMainTodo} />

      {TYPES.map((type) => (
        <TodoColumn
          key={type}
          title={type}
          todoList={todoColumns[type] ?? []}
          onClick={moveToMain}
        />
      ))}
    </div>
  )
}

export default App
