import { useCallback, useEffect, useRef, useState } from 'react';
import TodoColumn from './component/TodoColumn';
import styles from './App.module.css';
import type { ITodoItem, TTodoState } from './types/todo';
import { MOCKING_DATA, TYPES } from './data/todo';

const INITIAL_DATA_STATE: TTodoState = {
  main: MOCKING_DATA,
}

const App = () => {
  const [data, setData] = useState<TTodoState>(INITIAL_DATA_STATE)

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const getKey = ({ type, name }: ITodoItem) => `${type}-${name}`

  const moveToMain = useCallback((todo: ITodoItem) => {
    const key = getKey(todo)

    clearTimeout(timersRef.current.get(key))
    timersRef.current.delete(key)

    const { type } = todo;

    setData((prev) => (
      {
        ...prev,
        main: [...prev.main, todo],
        [type]: (prev[type] ?? []).filter((item) => getKey(item) !== key)
      }
    ))
  }, [])

  const handleClickMainTodo = useCallback((todo: ITodoItem) => {
    const key = getKey(todo)

    const { type } = todo;

    setData((prev) => (
      {
        ...prev,
        main: prev.main.filter((item) => getKey(item) !== key),
        [type]: [...(prev[type] ?? []), todo]
      })
    )

    timersRef.current.set(key, setTimeout(() => moveToMain(todo), 5000))
  }, [moveToMain])



  useEffect(() => {
    const timers = timersRef.current;

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  return (
    <div className={styles.container}>
      <TodoColumn data={data.main} onClick={handleClickMainTodo} />

      {TYPES.map((type) => (
        <TodoColumn
          key={type}
          title={type}
          data={data[type] ?? []}
          onClick={moveToMain}
        />
      ))}
    </div>
  )
}

export default App
