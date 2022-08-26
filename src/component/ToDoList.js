import React, { useState } from "react";
import ToDo from "./toDo";
import ToDoForm from "./ToDoForm";
import "../app.css";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text) || todo.text.length < 3) {
      return;
    }
    // Increasing last id
    setLastTodoId((lastId) => ++lastId);

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  function handelComplete(id) {
    let mapped = todos.map((task) => {
      return task.id === Number(id)
        ? { ...task, isComplete: !task.isComplete }
        : { ...task };
    });
    setTodos(mapped);
  }

  function handleDelete(id) {
    const remainTodo = todos.filter((t) => t.id !== id);
    setTodos(remainTodo);
  }

  function handleEdit(text, id) {
    let mapped = todos.map((task) => {
      return task.id === Number(id) ? { ...task, text } : { ...task };
    });
    setTodos(mapped);
  }

  return (
    <div>
      <ToDoForm onsubmit={addTodo} lastTodosId={lastTodoId} />
      {todos.map((todo) => {
        return (
          <ToDo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            handelComplete={handelComplete}
            handleEdit={handleEdit}
            isComplete={todo.isComplete}
          />
        );
      })}
      {todos.length > 0 ? (
        <div className="ToDoInfoBtn">
          <div>
            All:
            <span className="badge badge-fill bg-info ms-1">
              {todos.length}
            </span>{" "}
            Done:
            <span className="badge badge-fill bg-success ms-1">
              {todos.filter((todo) => todo.isComplete === true).length}
            </span>
          </div>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              setTodos([]);
            }}
          >
            Delete All
          </button>
        </div>
      ) : (
        <h1 style={{ color: "#ff7e31" }} className="text-center mb-3">
          Add a To-DO to get started!
        </h1>
      )}
    </div>
  );
}

export default ToDoList;
