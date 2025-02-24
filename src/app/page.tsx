"use client";
import React, { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState(0);
  const [recordNumber, setRecordNumber] = useState(0);

  return (
    <>
      <div>
        <div>{number}</div>
        <button onClick={() => setNumber(number + 1)}>증가</button>
        &nbsp;
        <button onClick={() => setNumber(number - 1)}>감소</button>
        &nbsp;
        <button onClick={() => setRecordNumber(number)}>기록</button>
        &nbsp;
        <button onClick={() => setRecordNumber(0)}>리셋</button>
      </div>
      <div>
        {recordNumber == 0 ? (
          <h1>숫자를 기록해주세요.</h1>
        ) : (
          <>
            <h1>기록 된 숫자</h1>
            <div>{recordNumber}</div>
          </>
        )}
      </div>
    </>
  );
}
