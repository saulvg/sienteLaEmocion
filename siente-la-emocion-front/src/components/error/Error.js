// ## Style ##
import './error.css';
//Componente para pintar errores o mensajes de alerta 
const Error = ({ children }) => {
  return (
    <div className='bodyError'>
      <div id='nExperiences'>
        <div id='nExperiencesStyle'>❗ {children}</div>
      </div>
    </div>
  );
};
export default Error;
