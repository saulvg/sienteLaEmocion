import './modalComponent.css';
import './modal.css';

// Este componente es sólo para abrir el modal y cerrarlo, exportándolo a Modal.js
export const ModalComponent = ({ children, isOpen, closeModal }) => {
  // handle para evitar la propagación del evento click del modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={`modal ${isOpen && 'open'}`} onClick={closeModal}>
      <div className='modal-container' onClick={handleModalClick}>
        <div className='circle-back'>
          <p className='modal-close' onClick={closeModal}>
            --Volver
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};
