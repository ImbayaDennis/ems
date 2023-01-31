import {useContext, ReactNode} from 'react'
import { ModalContextProvider } from '../../../contexts/ModalsContext'
import Modal from './Modal'

type Props = {
    children: ReactNode;
    modal: "createLeaveRequest"
}

const ModalContainer = ({children, modal}: Props) => {
    
  const modalContext = useContext(ModalContextProvider)

  const closeModal = () =>{
    if(modalContext.setModals){
      modalContext.setModals((prev)=> ({ ...prev, createLeaveRequest: {isOpen: false}}))
    }
  }

  addEventListener('keydown', (e)=>{
   if(e.code === "Escape"){
    closeModal()
   }
  })

  if(modalContext?.modals && modalContext?.modals[modal].isOpen){
    return (
      <Modal closeModal={closeModal}>{children}</Modal>
    )
  }
  return<></>
}

export default ModalContainer