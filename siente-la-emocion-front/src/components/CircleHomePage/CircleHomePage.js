import './circlePage.css';
const CircleHomePage = ({ id, clas, href, children }) => {
  return (
    <a href={href} id={id} className={`route ${clas}`}>
      <div className='route-content'>{children}</div>
    </a>
  );
};
export default CircleHomePage;

export const CircleActivities = ({ id, clas, children, image }) => {
  return (
    <div id={id} className={`route-content route ${clas}`}>
      {children}
      <div className='imgHeader'>
        <img src={image} alt='fotoExperiencia' />
      </div>
    </div>
  );
};
