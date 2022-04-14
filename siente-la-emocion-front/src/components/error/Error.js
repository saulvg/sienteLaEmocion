import './error.css';
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
