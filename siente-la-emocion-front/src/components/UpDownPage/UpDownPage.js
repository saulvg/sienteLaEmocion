import { useState } from 'react';
import './upDownPage.css';
const UpDownPage = () => {
  const [upORdown, setUpORdown] = useState('');

  window.onscroll = () => {
    if (document.documentElement.scrollTop > 100) {
      setUpORdown(true);
    } else {
      setUpORdown(false);
    }
  };

  return (
    <>
      {upORdown ? (
        <div
          className={`go-top-container`}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <div className='go-top-button'>
            <i className='arrow-up'></i>
          </div>
        </div>
      ) : (
        <div
          className='go-top-container '
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            })
          }
        >
          <div className='go-top-button'>
            <i className='arrow-down'></i>
          </div>
        </div>
      )}
    </>
  );
};
export default UpDownPage;
