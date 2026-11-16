import { useCallback, useState } from 'react';
import TodoColumn from './component/TodoColumn';
import './App.css'

type TType = 'Fruit' | 'Vegetable'

export interface ITodo {
  type: TType;
  name: string;
}

type TTodoState = { main: ITodo[] } & Record<TType, ITodo[]>

const TODO_TYPE: TType[] = ['Fruit', 'Vegetable']
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

const INITIAL_DATA_STATE: TTodoState = {
  main: MOCKING_DATA,
  Fruit: [],
  Vegetable: [],
}

const App = () => {
  const [data, setData] = useState<TTodoState>(INITIAL_DATA_STATE)

  const handleClickMainTodo = (todo: ITodo) => {
    // TODO: valid with type too, prevent same name but diff type
    const { type, name } = todo;

    setData((prev) => {
      const newTodoList = prev.main.filter((item) => item.name !== name)

      return ({
        ...prev,
        main: newTodoList,
        [type]: [...prev[type], todo]
      })
    })
  }

  const handleTodoBackToMain = useCallback((todo: ITodo) => {
    const { type, name } = todo;

    setData((prev) => {
      return ({
        ...prev,
        main: [...prev.main, todo],
        [type]: prev[type].filter((item) => item.name !== name)
      })
    })
  }, [])

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${TODO_TYPE.length + 1}, 1fr)` }}>
      <div>
        {data.main.map((todo) => {
          const { type, name } = todo;

          return (
            <button key={`${type}-${name}`} style={{ width: "100%" }} onClick={() => handleClickMainTodo(todo)}>
              <h3>{name}</h3>
            </button>
          )
        })}
      </div>

      {TODO_TYPE.map((type => (
        <div key={type}>
          <h3>{type}</h3>
          <TodoColumn data={data?.[type]} onClick={handleTodoBackToMain} />
        </div>
      )))}
    </div>
  )
}

export default App
