import { ModalComponent } from './modalComponent';
import { useModal } from '../../hooks/useModal';
//import './modal.css';

// MODAL REUTILIZABLE
// Aquí se importa modal component, y se le da estados de abierto o cerrado
// usando el hook useModal
//además de darle nombre a cada apartado del modal para su reutilización: {buttonName} etc

export const Modal = ({ buttonName, titleModal, content }) => {
  const [isOpen, openModal, closeModal] = useModal(false);
  // useModa
  return (
    <>
      <div>
        <button className='button-modal' onClick={openModal}>
          {buttonName}
        </button>
        <ModalComponent
          isOpen={isOpen}
          closeModal={closeModal}
          className='modal-container'
        >
          <h3 className='title-modal'>{titleModal}</h3>
          <div className='content'>{content}</div>
        </ModalComponent>
      </div>
    </>
  );
};