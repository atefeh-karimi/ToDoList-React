import React, { useEffect, useRef, useState } from "react";
import "../app.css";

function ToDoForm(props) {
  const [input, setInput] = useState("");
  const inputTodoElement = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    props.onsubmit({
      id: props.lastTodosId,
      text: input,
      isComplete: false,
    });
    setInput("");
  };

  useEffect(() => {
    inputTodoElement.current.focus();
  }, []);

  return (
    <form onSubmit={submitHandler} className="mb-5">
      <div className="d-flex justify-content-center">
        <input
          type="text"
          ref={inputTodoElement}
          value={input}
          className="pr-5 mr-2"
          placeholder="Enter New Task"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit" className="addButton">
          Add
        </button>
      </div>
    </form>
  );
}

export default ToDoForm;
