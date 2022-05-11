// ## Style ##
import './circlePage.css';

//Componente que utilizamos para pintar los cirulos 'links', de la 'HomePage'
//Recibe como props un id, una clase (para la hora de maquetar), un href (para saber a donde redirigir), un children(con el mendaje que ira dentro)
const CircleHomePage = ({ id, clas, href, children }) => {
  return (
    <a href={href} id={id} className={`route ${clas}`} data-aos='flip-left'>
      <span className='route-content'>{children}</span>
    </a>
  );
};
export default CircleHomePage;

//Componente que utilizamos para pintar los cirulos 'links', de 'ExperienceList'
//Recibe como props un id, una clase (para la hora de maquetar), un image (para saber que imagen de backgrund tendra), un children(con el mendaje que ira dentro)
export const CircleActivities = ({ id, clas, children, image }) => {
  return (
    <div
      id={id}
      className={`route-content route ${clas}`}
      style={{ backgroundImage: `url('${image}')` }}
    >
      {children}
    </div>
  );
};
