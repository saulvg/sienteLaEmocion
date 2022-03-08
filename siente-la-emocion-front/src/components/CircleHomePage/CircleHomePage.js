import './circlePage.css';
const CircleHomePage = ({ id, clas, href, children }) => {
  return (
    <div id={id} className={`route ${clas}`}>
      <a href={href}>{children}</a>
    </div>
  );
};
export default CircleHomePage;
