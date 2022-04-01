import './Forms.css';

const BlueButton = ({ name, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
};

export default BlueButton;
