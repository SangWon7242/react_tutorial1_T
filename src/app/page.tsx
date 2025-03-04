"use client";
import React, { useState } from "react";

interface NumberControllerProps {
  number: number;
  increaseNumber: () => void;
  decreaseNumber: () => void;
  saveNumber: () => void;
  resetNumber: () => void;
}

interface RecordedNumbersListProps {
  numberList: number[];
}

const NumberController = ({
  number,
  increaseNumber,
  decreaseNumber,
  saveNumber,
  resetNumber,
}: NumberControllerProps) => {
  return (
    <div>
      <div>{number}</div>
      <button onClick={increaseNumber}>증가</button>
      &nbsp;
      <button onClick={decreaseNumber}>감소</button>
      &nbsp;
      <button onClick={saveNumber}>기록</button>
      &nbsp;
      <button onClick={resetNumber}>리셋</button>
    </div>
  );
};

const RecordedNumbersList = ({ numberList }: RecordedNumbersListProps) => {
  return (
    <div>
      {numberList.length == 0 ? (
        <h1>숫자를 기록해주세요.</h1>
      ) : (
        <>
          <h1>기록 된 숫자</h1>
          <nav>
            <ul>
              {numberList.map((num, index) => (
                <li key={index}>
                  {index + 1}번 : {num}
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default function Home() {
  const [number, setNumber] = useState<number>(0);
  const [numberList, setNumberList] = useState<number[]>([]);

  const increaseNumber = () => {
    setNumber(number + 1);
  };

  const decreaseNumber = () => {
    if (number === 0) return;

    setNumber(number + 1);
  };

  const saveNumber = () => {
    const newNumber = [...numberList, number];
    setNumberList(newNumber);
  };

  const resetNumber = () => {
    setNumber(0);
    setNumberList([]);
  };

  return (
    <>
      <NumberController
        number={number}
        increaseNumber={increaseNumber}
        decreaseNumber={decreaseNumber}
        saveNumber={saveNumber}
        resetNumber={resetNumber}
      />
      <RecordedNumbersList numberList={numberList} />
    </>
  );
}
