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
      } z-0 h-screen w-screen overflow-hidden `}
    >
      {session && <AppbarContainer />}
      <div className="flex h-full w-full">
        {session && (
          <SidebarContainer
            themeFromStorage={themeFromStorage}
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />
        )}
        <main
          className={`p-2 h-full w-full overflow-scroll bg-gray-100 text-gray-500 scrollbar-thin dark:bg-gray-800 dark:text-gray-300 md:static overflow-y-scroll`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
