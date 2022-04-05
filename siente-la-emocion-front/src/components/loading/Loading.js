import './loading.css';
const Loading = ({ children }) => {
  return (
    <div id='entryCreated'>
      <div>{children}</div>
      <div className='loading'></div>
    </div>
  );
};
export default Loading;
