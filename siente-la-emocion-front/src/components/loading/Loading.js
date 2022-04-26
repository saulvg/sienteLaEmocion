import './loading.css';
const Loading = ({ children, clas }) => {
  return (
    <div id='entryCreated' className={clas}>
      <div>{children}</div>
      <div className='loading'></div>
    </div>
  );
};
export default Loading;
