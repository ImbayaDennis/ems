import {
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "~/utils/api";
import Loader from "../common/Loader";
import { HiX } from "react-icons/hi";
import { StaticImageData } from "next/image";
import moment from "moment";

const LogsManager = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [activeEmployeeID, setActiveEmployeeID] = useState<
    string | undefined | null
  >("");
  const [activeEmployeeName, setActiveEmployeeName] = useState<
    string | null | undefined
  >(undefined);

  const { data: allLogs, isLoading: logsLoading } =
    api.logsManagement.getAllLogs.useQuery();
  const { data: employees } = api.employees.getEmployees.useQuery();

  const {
    data: employeeLogs,
    isLoading: loadingEmployeeLogs,
    refetch: refetchEmployeeLogs,
  } = api.logsManagement.getEmployeeLogs.useQuery({
    employee_id: activeEmployeeID,
  });

  useEffect(() => {
    setActiveEmployeeName(
      employees?.filter((e) => e.employee_id === activeEmployeeID)[0]?.name
    );
  }, [activeEmployeeID]);

  const matches = employees?.filter((employee) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return employee?.name?.match(regex);
  });

  const handleSelectEmployee = (employee_id: string | undefined | null) => {
    setActiveEmployeeID(employee_id);
    setSearchText("");

    refetchEmployeeLogs().catch((e) => console.error(e));
  };

  const activeLogs = activeEmployeeID === "" ? allLogs : employeeLogs;

  if (logsLoading) {
    return (
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 w-full text-2xl">Logs Manager</p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Loader />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <div className="flex w-full">
      <table className="mb-28 w-full">
        <thead className="w-full">
          <tr>
            <td>
              <p className="my-8 text-2xl">Logs Manager</p>
            </td>
          </tr>
          <tr className="my-2">
            <td className="relative flex items-center gap-4">
              <input
                className="input-1 outline-none md:w-1/3"
                placeholder="Search for employee..."
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.currentTarget.value)}
              />

              {searchText !== "" ? (
                <div className="absolute top-12 left-0 z-10 w-1/3 rounded-b-md border-b border-slate-300 bg-slate-200/60 p-2 text-slate-700 backdrop-blur-md dark:border-slate-900 dark:bg-slate-800/60 dark:text-slate-50">
                  {matches?.map((match) => (
                    <button
                      key={match.employee_id}
                      onClick={() => {
                        handleSelectEmployee(match.employee_id);
                      }}
                      className="h-12 w-full"
                    >
                      {match?.name}
                    </button>
                  ))}
                </div>
              ) : null}
            </td>
          </tr>
          {activeEmployeeName === undefined ? (
            <tr className="h-16 w-full"></tr>
          ) : (
            <tr className="h-16">
              <td className="m-1">
                <span className="m-2 flex w-fit items-center gap-2 rounded-sm border p-2">
                  <p>{activeEmployeeName}</p>
                  <button
                    onClick={() => {
                      setActiveEmployeeID("");
                      setActiveEmployeeName(undefined);
                      setSearchText("");
                    }}
                  >
                    <HiX />
                  </button>
                </span>
              </td>
            </tr>
          )}
          <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-sm bg-slate-200 p-2 text-slate-700 dark:bg-slate-700 dark:text-slate-50">
            <td className="w-36 p-2">Empoyee name</td>
            <td className="w-36 p-2">Time In</td>
            <td className="w-36 p-2">Time Out</td>
            <td className="w-36 p-2">Date</td>
          </tr>
        </thead>
        <tbody className="overflow-x-scroll">
          {loadingEmployeeLogs ? (
            <tr>
              <td>
                <Loader />
              </td>
            </tr>
          ) : (
            activeLogs?.map((log) => (
              <ListItem
                key={log.id}
                column1={log.employee?.name}
                column2={moment(log.time_in).format("HH:MM:SS")}
                column3={moment(log.time_out).format("HH:MM:SS")}
                column4={moment(log.time_in).format("YYYY-MM-DD")}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LogsManager;

type ListItemProps = {
  image?: string | StaticImageData;
  column1?: string | number | null;
  column2?: string | number | null;
  column3?: string | number | null;
  column4?: string | number | null;
  column5?: string | number | null;
  column6?: string | number | null;
};

const ListItem = ({
  column1 = "column1",
  column2 = "column2",
  column3 = "column3",
  column4 = "column4",
}: ListItemProps) => {
  return (
    <tr className="my-2 flex h-12 w-full items-center justify-evenly rounded-sm bg-slate-300/60 p-2 text-slate-600 backdrop-blur-md dark:bg-slate-500/60 dark:text-slate-50">
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column1}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column2}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column3}</p>
      </td>
      <td className="w-36 overflow-hidden p-2 text-sm">
        <p>{column4}</p>
      </td>
    </tr>
  );
};
