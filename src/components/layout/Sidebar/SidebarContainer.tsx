import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";

type Props = {
  isDarkTheme: boolean;
  setIsDarkTheme: Dispatch<SetStateAction<boolean>>;
  themeFromStorage: boolean;
};

const SidebarContainer = ({
  isDarkTheme,
  setIsDarkTheme,
  themeFromStorage,
}: Props) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const setTheme = () => {
    const theme = !isDarkTheme

    setIsDarkTheme(theme);
    localStorage.setItem("darkTheme", theme.toString());
    console.log(isDarkTheme.toString())
  };

  return (
    <Sidebar
      isDarkTheme={themeFromStorage}
      setIsDarkTheme={setTheme}
      sidebarIsOpen={sidebarIsOpen}
      setSidebarIsOpen={setSidebarIsOpen}
    />
  );
};

export default SidebarContainer;
