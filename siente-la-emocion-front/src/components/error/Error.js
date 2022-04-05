import './error.css';
const Error = ({ children }) => {
  return (
    <div id='nExperiences'>
      <div id='nExperiencesStyle'>❗ {children}</div>
    </div>
  );
};
export default Error;
