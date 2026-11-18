import { useCallback, useEffect, useRef, useState } from 'react';
import TodoColumn from './component/TodoColumn';
import MainTodoColumn from './component/MainTodoColumn';
import styles from './App.module.css';

export interface ITodo {
  type: string;
  name: string;
}

type TTodoState = { main: ITodo[] } & Partial<Record<string, ITodo[]>>

const MOCKING_DATA: ITodo[] = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
]

const TYPES = [...new Set(MOCKING_DATA.map(({ type }) => type))]

const INITIAL_DATA_STATE: TTodoState = {
  main: MOCKING_DATA,
}

const App = () => {
  const [data, setData] = useState<TTodoState>(INITIAL_DATA_STATE)

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>())
  const getKey = ({ type, name }: ITodo) => `${type}-${name}`

  const moveToMain = useCallback((todo: ITodo) => {
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

  const handleClickMainTodo = useCallback((todo: ITodo) => {
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
      <MainTodoColumn data={data.main} onClick={handleClickMainTodo} />

      {TYPES.map((type) => (
        <div key={type} className={styles.column}>
          <div className={styles.columnHeader}>
            <h3>{type}</h3>
          </div>

          <TodoColumn data={data[type] ?? []} onClick={moveToMain} />
        </div>
      ))}
    </div>
  )
}

export default App
