import './Forms.css';

const BlueButton = ({ name, onClick, buttonName }) => {
  return (
    <button className={buttonName} onClick={onClick}>
      {name}
    </button>
  );
};

export default BlueButton;
