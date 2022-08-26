import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import "../app.css";

function ToDo({
  onDelete,
  todo,
  isComplete,
  handelComplete,
  handleEdit: handleParentEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTodoText, setCurrentTodoText] = useState(""); //which todo item we are editing
  const inputEditElement = useRef();

  function handleEdit(todo) {
    setIsEdit(true);
    setCurrentTodoText(todo.text);
  }

  useEffect(() => {
    if (isEdit) {
      inputEditElement.current.focus();
    }
  }, [isEdit]);

  function handleEditInputChange(e) {
    setCurrentTodoText(e.target.value);
  }

  function handleInputKeyPress(e) {
    if (e.key === "Enter") {
      handleEditDone();
    } else if (e.key === "Escape") {
      setIsEdit(false);
    }
  }

  function handleTextInputBlur(e) {
    handleEditDone();
  }

  function handleEditDone() {
    setIsEdit(false);
    handleParentEdit(currentTodoText, todo.id);
  }
  return (
    <div className="ToDoBox">
      <span
        className={
          isComplete
            ? "SpanToDoBox text-decoration-line-through "
            : "SpanToDoBox"
        }
        onClick={() => {
          handelComplete(todo.id);
        }}
      >
        {isEdit ? (
          <input
            type="text"
            value={currentTodoText}
            ref={inputEditElement}
            onChange={(e) => {
              handleEditInputChange(e);
            }}
            onClick={(e) => e.stopPropagation()}
            onBlur={handleTextInputBlur}
            onKeyDown={handleInputKeyPress}
          />
        ) : (
          todo.text
        )}
      </span>

      <div>
        <button
          className="hoverStyleEdit"
          onClick={(e) => {
            handleEdit(todo);
          }}
        >
          <FaEdit />
        </button>

        <button
          className="hoverStyleDelete"
          onClick={() => {
            onDelete(todo.id);
          }}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default ToDo;
