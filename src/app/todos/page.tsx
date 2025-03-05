"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

interface TodoFormProps {
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  addTodo: () => void;
}

interface TodoListProps {
  todos: string[];
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

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <div className="todo-list mt-3">
      <h2>할 일을 작성해주세요.</h2>
      <div>{JSON.stringify(todos)}</div>
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
      <TodoList todos={todos} />
    </div>
  );
}
