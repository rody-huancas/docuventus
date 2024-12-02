"use client";

import { ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Header } from "@/components";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ProgressBar color="#fff" height="4px" shallowRouting />

      <Header />

      <main className="bg-main">
        <div className="mt-32">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
