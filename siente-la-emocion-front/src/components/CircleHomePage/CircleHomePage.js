import './circlePage.css';
const CircleHomePage = ({ id, clas, href, children, background }) => {
  return (
    <a href={href} id={id} className={`route ${clas}`}>
      <div className='route-content'>{children}</div>
    </a>
  );
};
export default CircleHomePage;
