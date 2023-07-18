/* eslint-disable @next/next/no-img-element */
import Anchor from "@/components/Anchor";
import React from "react";
function Home() {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <header className="py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Welcome</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section>
            <div className="bg-[#2c2c6c] p-5 rounded-lg  border border-transparent transition-all duration-400 ease-in hover:bg-transparent hover:border-[#2c2c6c]">
              <div className="overflow-hidden rounded-2xl">
                <img src="/images/Screenshot.png" alt="screenshot" />
              </div>
              <h2 className="my-3 pb-8 text-xl">Data Table Example</h2>

              <div className="flex gap-4 mb-4">
                <Anchor
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/zniper17/data-table/blob/main/src/components/DataTable.tsx"
                >
                  Github
                </Anchor>
                <Anchor
                  className="bg-[#4db5ff] text-[#1f1f38]"
                  href="/example"
                  rel="noreferrer"
                >
                  Live Demo
                </Anchor>
              </div>
            </div>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
}

export default Home;
