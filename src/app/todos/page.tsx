"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TodoFormProps {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  addTodo: () => void;
}

interface TodoListProps {
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
}

interface TodoListItemProps {
  value: string;
  index: number;
  todos: string[];
  setTodos: Dispatch<SetStateAction<string[]>>;
}

const TodoForm = ({ todo, setTodo, addTodo }: TodoFormProps) => {
  return (
    <div className="todo-input-form flex gap-x-2">
      <input
        type="text"
        placeholder="할 일을 작성해주세요."
        className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addTodo}>
        작성
      </button>
    </div>
  );
};

const TodoListItem = ({ value, index, todos, setTodos }: TodoListItemProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(value);

  const modifyTodo = (index: number) => {};

  const removeTodo = (index: number) => {};

  return (
    <li className="flex gap-x-2 items-center py-1">
      {isEditMode ? (
        <span className="flex gap-x-2">
          <>
            <input
              type="text"
              placeholder="할 일을 작성해주세요."
              className="input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button
              className="btn btn-outline btn-primary"
              onClick={() => modifyTodo(index)}
            >
              수정
            </button>
          </>
        </span>
      ) : (
        <>
          <span>
            {index + 1}번 : {value}
          </span>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => setIsEditMode(true)}
          >
            수정
          </button>
        </>
      )}
      <button
        className="btn btn-outline btn-secondary"
        onClick={() => removeTodo(index)}
      >
        삭제
      </button>
    </li>
  );
};

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return (
    <div className="todo-list mt-3">
      {todos.length === 0 ? (
        <h2>할 일을 작성해주세요.</h2>
      ) : (
        <>
          <h2>할 일 목록</h2>
          <ul>
            {todos.map((value, index) => (
              <TodoListItem
                key={index}
                value={value}
                index={index}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default function Todo() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (todo.trim().length === 0) {
      alert("할 일을 작성해주세요.");
      return;
    }

    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <div className="todos-wrap">
      <TodoForm todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
