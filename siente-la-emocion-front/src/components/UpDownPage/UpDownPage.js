// ## Style ##
import './upDownPage.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState } from 'react';

//Componente que utilizamos para pintar y dar funcionalidad a un boton que suba y baje la ventana de la web para ir al header o al main
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
