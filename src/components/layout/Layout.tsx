import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import AppbarContainer from "./Appbar/AppbarContainer";
import SidebarContainer from "./Sidebar/SidebarContainer";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function Layout({ children }: Props) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [themeFromStorage, setThemeFromStorage] = useState<boolean>(true);
  const {data: session} = useSession();

  useEffect(() => {
    setThemeFromStorage(localStorage.getItem("darkTheme") === "true");
  }, [isDarkTheme]);

  return (
    <div
      className={`${
        themeFromStorage ? "dark" : ""
      } z-0 h-screen w-screen overflow-y-scroll scrollbar-thin`}
    >
      {session && <AppbarContainer />}
      <div className="flex h-full w-full bg-gray-100 bg-main-texture bg-cover bg-blend-overlay dark:bg-gray-800">
        {session && (
          <SidebarContainer
            themeFromStorage={themeFromStorage}
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />
        )}
        <main
          className={`my-3 w-full py-9 px-4 text-gray-700 bg-blend-overlay scrollbar-thin scrollbar-track-slate-400/40 scrollbar-thumb-slate-600/40 dark:text-gray-300 dark:scrollbar-track-slate-800/40 dark:scrollbar-thumb-slate-900/40`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
