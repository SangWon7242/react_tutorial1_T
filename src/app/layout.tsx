import type { Metadata } from "next";
import Header from "./common/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "리액트 튜토리얼1",
  description: "간단 숫자 기록 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
