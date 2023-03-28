import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const STORAGE_TODOS_KEY = "todos";
const storedTodo = JSON.parse(localStorage.getItem(STORAGE_TODOS_KEY) ?? "[]");

function App() {
  const [todo, setTodo] = useState(storedTodo);

  useEffect(() => {
    localStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="App">
      <div>
        <Header />
        <AddTodo todo={todo} setTodo={setTodo} />
        <TodoList todo={todo} setTodo={setTodo} />
      </div>
    </div>
  );
}

export default App;
