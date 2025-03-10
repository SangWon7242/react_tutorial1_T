"use client";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";

interface TodoFormProps {
  todo: string;
  addTodo: (newTodo: string) => void;
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

const TodoForm = ({ todo, addTodo }: TodoFormProps) => {
  // input 엘리먼트에 대한 참조를 저장하는 ref
  // ref가 HTML 입력 요소를 참조
  const inputRef = useRef<HTMLInputElement>(null);

  // form 제출 핸들러

  // handleSubmit에서 inputRef.current.value를 setTodo로 설정하고 addTodo를 호출하는데,
  // addTodo 함수 내에서 todo.trim().length === 0 체크를 하면
  // setTodo는 비동기로 동작하기 때문에 이전 todo 값을 사용하게 됩니다.
  // 따라서 handleSubmit에서 직접 trim() 체크를 하는 것이 좋습니다.

  const handleSubmit = () => {
    // inputRef.current의 값을 직접 확인
    const currentValue = inputRef.current?.value || "";

    if (currentValue.trim().length === 0) {
      alert("할 일을 작성해주세요.");
      // ?. 는 옵셔널 체이닝 연산자
      // inputRef.current가 null이나 undefined일 경우 에러를 발생시키지 않고 undefined를 반환
      // 즉, inputRef.current가 존재할 때만 focus() 메서드를 호출합니다.
      inputRef.current?.focus();
      return;
    }

    // ref를 통해 직접 DOM에 접근하여 값을 가져옴
    // 이렇게 하면 매 키입력마다 리렌더링이 발생하지 않음
    addTodo(currentValue);

    // current가 null이 아닌지 확인 후 사용
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="todo-input-form flex gap-x-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="할 일을 작성해주세요."
        className="input"
        defaultValue={todo} // value 대신 defaultValue 사용으로 불필요한 리렌더링 방지
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        작성
      </button>
    </div>
  );
};

const TodoListItem = ({ value, index, todos, setTodos }: TodoListItemProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 수정 모드 진입 시 자동 focus
  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
    }
  }, [isEditMode]);

  const modifyTodo = (index: number) => {
    const currentValue = inputRef.current?.value || "";

    if (currentValue.trim().length === 0) {
      alert("할 일을 작성해주세요.");
      inputRef.current?.focus();
      return;
    }

    const newTodos = todos.map((todo, _index) =>
      _index === index ? currentValue : todo
    );

    setTodos(newTodos);
    setIsEditMode(false);
  };

  const removeTodo = (index: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const newTodos = todos.filter((_, _index) => _index !== index);

    setTodos(newTodos);
  };

  return (
    <li className="flex gap-x-2 items-center py-1">
      {isEditMode ? (
        <span className="flex gap-x-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="할 일을 작성해주세요."
            className="input"
            defaultValue={value}
          />
          <button
            className="btn btn-outline btn-primary"
            onClick={() => modifyTodo(index)}
          >
            수정
          </button>
          <button
            className="btn btn-outline btn-neutral"
            onClick={() => setIsEditMode(false)}
          >
            취소
          </button>
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
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => removeTodo(index)}
          >
            삭제
          </button>
        </>
      )}
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

  const addTodo = (newTodo: string) => {
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  return (
    <div className="todos-wrap">
      <TodoForm todo={todo} addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
