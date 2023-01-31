import { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react'

type Props = {
    children: ReactNode
}

type Modals = {
    "createLeaveRequest": {
        isOpen: boolean;
    };
}

type ModalsContext = {
    modals?: Modals;
    setModals?: Dispatch<SetStateAction<Modals>>
}

export const ModalContextProvider = createContext<ModalsContext>({})

const ModalsContext = ({children}: Props) => {

  const [modals, setModals] = useState<Modals>({
    createLeaveRequest: { isOpen: false },
  });

  const value: ModalsContext = {modals, setModals}

  return (
    <ModalContextProvider.Provider value={value}>{children}</ModalContextProvider.Provider>
  )
}

export default ModalsContext