import { useContext, ReactNode, useEffect } from "react";
import { ModalContextProvider } from "../../../contexts/ModalsContext";
import Modal from "./Modal";

type Props = {
  children: ReactNode;
  modal: "createLeaveRequest" | "createEmployee" | "createLeaveType" | "returnFromLeave";
};

const ModalContainer = ({ children, modal }: Props) => {
  const modalContext = useContext(ModalContextProvider);

  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    });
  }, []);

  const closeModal = () => {
    if (modalContext.setModals) {
      modalContext.setModals((prev) => ({
        ...prev,
        createLeaveRequest: { isOpen: false },
        createEmployee: { isOpen: false },
        createLeaveType: { isOpen: false },
        returnFromLeave: { isOpen: false },
      }));
    }
  };

  if (modalContext?.modals && modalContext?.modals[modal].isOpen) {
    return <Modal closeModal={closeModal}>{children}</Modal>;
  }
  return <></>;
};

export default ModalContainer;
