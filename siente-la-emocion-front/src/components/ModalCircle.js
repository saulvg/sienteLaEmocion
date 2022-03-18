import './Forms.css';
export const ModalCircle = ({ name }) => {
  const handleClick =()=>{window.history.go(-1)}
  return (
    <button onClick={handleClick}>
      <div className='modal-circle'>
        <p className='goback'>Volver</p>
        <p className='circle-name'>{name}</p>
      </div>
    </button>
  );
};
