import { ModalComponent } from './modalComponent';
import { useModal } from '../../hooks/useModal';
import './modal.css';
import BlueButton from '../Forms/BlueButton';

// MODAL REUTILIZABLE
// Aquí se importa modal component, y se le da estados de abierto o cerrado
// usando el hook useModal
//además de darle nombre a cada apartado del modal para su reutilización: {buttonName} etc

export const Modal = ({ buttonClass, id, buttonName, titleModal, content }) => {
  const [isOpen, openModal, closeModal] = useModal(false);
  // useModa
  return (
    <>
      <div>
        <button className={buttonClass} onClick={openModal}>
          {buttonName}
          {id}
        </button>
        <ModalComponent isOpen={isOpen} closeModal={closeModal}>
          <h3 className='title-modal'>{titleModal}</h3>
          <div className='content'>{content}</div>
        </ModalComponent>
      </div>
    </>
  );
};
