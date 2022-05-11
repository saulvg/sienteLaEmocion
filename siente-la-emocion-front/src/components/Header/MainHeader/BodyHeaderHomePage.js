// ## Style ##
import './bodyHeaderHomePage.css';
//Componente que pinta el header la vista lista de actividades
const BodyHeaderHomePage = () => {
  return (
    <div className='headerBody bodyHeaderHomePage'>
      <h1 data-aos='fade-right' data-aos-duration='2000'>
        Siente la emoción
      </h1>
      <p data-aos='fade-left' data-aos-duration='2000'>
        Disfruta el momento
      </p>
    </div>
  );
};
export default BodyHeaderHomePage;
