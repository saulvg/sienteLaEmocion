import './Forms.css';

const BlueButton = ({ name, onClick }) => {
  return (
    <button className='blue-button' onClick={onClick}>
      {name}
    </button>
  );
};

export default BlueButton;
