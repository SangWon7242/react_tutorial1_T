"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="top-bar h-20 border-b-2 ">
        <div className="inner mx-auto flex h-full px-12 ">
          <nav className="menu-1">
            <ul className="flex h-full">
              <li className="nav-item">
                <Link href="/" className="menu-text">
                  메인 페이지
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/counter" className="menu-text">
                  숫자 기록 앱
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
