import {Metadata} from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: '공유 기록 | Moveto',
}

export default function HistoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}