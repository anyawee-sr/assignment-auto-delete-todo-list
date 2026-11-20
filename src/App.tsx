import { useCallback, useEffect, useRef, useState } from 'react'
import TodoList from './components/TodoList'
import TodoTypeColumn from './components/TodoTypeColumn'
import styles from './App.module.css'
import type { ITodoItem, TTodoColumns } from './types/todo'
import { RAW_TODO_LIST } from './data/rawTodoList'
import {
  EMPTY_TODO_LIST,
  moveTodoToMainColumn,
  moveTodoToTypeColumn,
} from './utils/todoColumns'
import { getTodoTypeList, transformTodoList } from './utils/todoList'

const AUTO_MOVE_DELAY_MS = 5000

const todoTypeList = getTodoTypeList(RAW_TODO_LIST)

const App = () => {
  const [todoColumns, setTodoColumns] = useState<TTodoColumns>(() => ({
    main: transformTodoList(RAW_TODO_LIST),
  }))

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const moveToMain = useCallback((todo: ITodoItem) => {
    const { id } = todo

    clearTimeout(timersRef.current.get(id))
    timersRef.current.delete(id)

    setTodoColumns((prev) => moveTodoToMainColumn(prev, todo))
  }, [])

  const handleClickMainTodo = useCallback(
    (todo: ITodoItem) => {
      setTodoColumns((prev) => moveTodoToTypeColumn(prev, todo))

      timersRef.current.set(
        todo.id,
        setTimeout(() => moveToMain(todo), AUTO_MOVE_DELAY_MS),
      )
    },
    [moveToMain],
  )

  useEffect(() => {
    const timers = timersRef.current

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className={styles.container}>
      <section aria-label="Main list">
        <TodoList todoList={todoColumns.main} onClick={handleClickMainTodo} />
      </section>

      {todoTypeList.map((type) => (
        <TodoTypeColumn
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
