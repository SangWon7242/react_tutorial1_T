"use client";
import React, { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <div>{number}</div>
      <button onClick={() => setNumber(number + 1)}>증가</button>
      &nbsp;
      <button onClick={() => setNumber(number - 1)}>감소</button>
    </div>
  );
}
