import { useContext, type ReactNode, useEffect, useCallback } from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import Modal from "./Modal";

type Props = {
  children: ReactNode;
  modal: "createLeaveRequest" | "createEmployeeLeaveRequest" | "createEmployee" | "editEmployee" | "createLeaveType" | "returnFromLeave";
};

const ModalContainer = ({ children, modal }: Props) => {
  const modalContext = useContext(ModalContextProvider);

  
  const closeModal = useCallback(() => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveRequest: { isOpen: false },
        createEmployeeLeaveRequest: { isOpen: false },
        createEmployee: { isOpen: false },
        editEmployee: { isOpen: false },
        createLeaveType: { isOpen: false },
        returnFromLeave: { isOpen: false },
      }));
    }
  },[modalContext]);
  useEffect(() => {
    window.addEventListener("keydown", (key)=>{
      if (key.code === "Escape") {
        closeModal();
      }
    });

  }, [closeModal]);

  if (modalContext?.modals && modalContext?.modals[modal].isOpen) {
    return <Modal closeModal={closeModal}>{children}</Modal>;
  }
  return <></>;
};

export default ModalContainer;
