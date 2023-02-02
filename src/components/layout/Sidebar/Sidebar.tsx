import Link from "next/link";
import { type ReactNode, type Dispatch, type SetStateAction, useLayoutEffect } from "react";
import { HiMenu, HiMoon, HiSun } from "react-icons/hi";
import { AdminLinks, EmployeeLinks } from "../../../assets/constants";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { IconType } from "react-icons/lib";

type Props = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: Dispatch<SetStateAction<boolean>>;
  isDarkTheme: boolean;
  setIsDarkTheme: () => void;
};

const Sidebar = ({
  sidebarIsOpen,
  setSidebarIsOpen,
  isDarkTheme,
  setIsDarkTheme,
}: Props) => {
  const width = sidebarIsOpen ? "w-[20rem]" : "w-12";
  const { data: session } = useSession();
  


    return (
      <div
        className={`z-20 border-r border-r-gray-300 bg-slate-100 dark:border-r-gray-900 dark:bg-slate-800 ${width}  flex h-full flex-col items-center transition-all`}
      >
        <div
          className={
            sidebarIsOpen
              ? "absolute top-0 left-0 -z-10 h-screen w-screen bg-black/20 backdrop-blur-sm"
              : ""
          }
          onClick={() => {
            setSidebarIsOpen(false);
          }}
        />
        <button
          aria-label="expand sidebar"
          onClick={() => setSidebarIsOpen((prev) => !prev)}
          className="self-end px-3 py-2 text-2xl text-gray-500 transition-colors hover:text-orange-600 hover:dark:text-orange-400"
        >
          <HiMenu />
        </button>
        <div className=" flex h-[calc(100vh-8rem)] w-full flex-col justify-between">
          <div
            className={`my-4 flex w-full flex-col self-start overflow-hidden`}
          >
            {session?.user?.role === "admin"
              ? AdminLinks?.map((navLnk) => (
                  <SidebarLink
                    key={navLnk.link}
                    sidebarIsOpen={sidebarIsOpen}
                    link={navLnk.link}
                    icon={<navLnk.icon />}
                    to={navLnk.to}
                  />
                ))
              : EmployeeLinks?.map((navLnk) => (
                  <SidebarLink
                    key={navLnk.link}
                    sidebarIsOpen={sidebarIsOpen}
                    link={navLnk.link}
                    icon={<navLnk.icon />}
                    to={navLnk.to}
                  />
                ))}
          </div>
          <div className="">
            <button
              aria-label="Theme toggle"
              onClick={() => {
                setIsDarkTheme();
              }}
              className="flex w-full flex-nowrap items-center border-l-4 border-l-transparent p-2 text-2xl text-gray-600 dark:text-gray-400"
            >
              <span>{isDarkTheme ? <HiSun /> : <HiMoon />} </span>
              <span
                className={`${
                  sidebarIsOpen ? "opacity-100" : "opacity-0"
                } ml-6 whitespace-nowrap text-base transition-opacity duration-300`}
              >
                {isDarkTheme ? "Set Light Theme" : "Set Dark Theme"}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
};

export default Sidebar;

type SidebarLinkProps = {
  link: string;
  activeLink?: string;
  icon: ReactNode;
  to: string;
  sidebarIsOpen: boolean;
  onClick?: () => void;
};

const SidebarLink = ({
  link,
  icon,
  to,
  sidebarIsOpen,
  onClick,
}: SidebarLinkProps) => {
  const _activeLink =
    "dark:bg-gray-900 bg-gray-300 dark:border-l-orange-400 border-l-orange-600 dark:text-orange-400 text-orange-600";
  const router = useRouter();
  return (
    <Link
      className={`flex w-full flex-nowrap items-center whitespace-nowrap border-l-4 px-2 py-4 text-2xl text-gray-500 hover:bg-gray-300 hover:dark:bg-gray-900 ${
        router.pathname === link ? _activeLink : "border-l-transparent"
      }`}
      aria-label={to}
      href={link || ""}
      onClick={onClick}
    >
      <span>{icon} </span>
      <span
        className={`${
          sidebarIsOpen ? "opacity-100" : "opacity-0"
        } ml-6 text-base transition-opacity duration-300`}
      >
        {to}
      </span>
    </Link>
  );
};
