import './Forms.css';
export const ModalCircle = ({ name }) => {
  return (
    <div className='modal-circle'>
      <p className='circle-name'>Volver</p>
      <p className='circle-name'>{name}</p>
    </div>
  );
};
