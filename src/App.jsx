import { useEffect, useState } from 'react'

import './styles/App.css'

import Header from './components/Header/Header'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'

// Все хорошо

function App() {

  const [todo, setTodo] = useState([])

  useEffect(() => {
    const storeTodos = localStorage.getItem('todos')
    console.log('loaded')
    if (storeTodos) {
      setTodo(JSON.parse(storeTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo))
  }, [todo])

  return (
    <div className="App">
      <Header />
      <AddTodo todo={todo} setTodo={setTodo}/>
      <TodoList todo={todo} setTodo={setTodo}/>
    </div>
  )
}

export default App
