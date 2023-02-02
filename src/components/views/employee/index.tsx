import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import { trpc } from "../../../utils/trpc";
import DashboardRightPanel from "../../common/DashboardRightPanel";
import LeaveRequestFormContainer from "../../common/LeaveRequestForm/LeaveRequestFormContainer";
// import ListItemCard from "../../common/ListItemCard";
import MetricsCard from "../../common/MetricsCard";

const AdminHomePage = () => {
  const { data: session } = useSession();
  const { data: leaveRequestData, refetch } =
    trpc.leaveManagement.getLeaveRequest.useQuery();
  const modalContext = useContext(ModalContextProvider);

  const openLeaveReqModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveRequest: { isOpen: true },
      }));
    }
  };

  return (
    <div className="h-full w-full">
      <h1 className="my-8 mx-4 text-start text-2xl">
        Welcome, {session?.user?.name || "[Admin name]"}
      </h1>
      <div className="flex h-full w-full flex-wrap">
        <div className="m-2 flex h-full max-h-[calc(100vh-10rem)] w-full flex-col items-start p-2 md:w-1/2">
          <MetricsCard
            metric_one_label="Total leave days"
            metric_two_label="Entitled leave days"
            metric_three_label="Earned leave days"
          />
          {/* <ListItemCard
            title="Leave Requests"
            btn_lbl="See all requests"
            listData={leaveRequestData}
          /> */}
          <LeaveRequestFormContainer
            refetchLeaveRequests={() => {
              refetch().catch((e) => console.error(e));
            }}
          />
        </div>
        <DashboardRightPanel
          leaveRequestData={leaveRequestData}
          openLeaveReqModal={openLeaveReqModal}
        />
      </div>
    </div>
  );
};

export default AdminHomePage;
