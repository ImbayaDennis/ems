import { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react'

type Props = {
    children: ReactNode
}

type Modals = {
  createLeaveRequest: {
    isOpen: boolean;
  };
  createEmployeeLeaveRequest: {
    isOpen: boolean;
  };
  createEmployee: {
    isOpen: boolean;
  };
  editEmployee: {
    isOpen: boolean;
  };
  createLeaveType: {
    isOpen: boolean;
  };
  returnFromLeave: {
    isOpen: boolean;
  };
};

type ModalsContext = {
    modals?: Modals;
    setModals?: Dispatch<SetStateAction<Modals>>
}

export const ModalContextProvider = createContext<ModalsContext>({})

const ModalsContext = ({children}: Props) => {

  const [modals, setModals] = useState<Modals>({
    createLeaveRequest: { isOpen: false },
    createEmployeeLeaveRequest: { isOpen: false },
    createEmployee: { isOpen: false },
    editEmployee: { isOpen: false },
    createLeaveType: { isOpen: false },
    returnFromLeave: { isOpen: false },
  });

  const value: ModalsContext = {modals, setModals}

  return (
    <ModalContextProvider.Provider value={value}>{children}</ModalContextProvider.Provider>
  )
}

export default ModalsContext