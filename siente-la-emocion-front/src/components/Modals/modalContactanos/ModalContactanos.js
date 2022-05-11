// ## Style ##
import './contacto.css';

/**
 * ################
 * ## Components ##
 * ################
 */
import { Modal } from '../Modal';
import SocialNetwork from '../../SocialNetwork/SocialNetwork';
//Componente que utilizamos para mintar un modal para contctar con los admin de la app
const ModalContactanos = () => {
  return (
    <>
      <Modal
        buttonName='Contacta'
        buttonClass='nav-button'
        contentClass='modal-fg'
        content={
          <>
            <div className='contacta-bg'>
              <section className='contacta-section'>
                <div>
                  <h2>¿Quieres formar parte de nosotros?</h2>
                </div>
              </section>
              <section className='contacta-section'>
                <div>
                  <h2>Contacta con nosotros</h2>
                  <div className='contact-flex-data'>
                    <div className='contact-data'>
                      <h3>Llámanos</h3>
                      <p>123 456 789</p>
                    </div>
                    <div className='contact-data'>
                      <h3>Escríbenos</h3>
                      <p>emoción@gmail.com</p>
                    </div>
                    <div className='contact-data'>
                      <h3>Visítanos</h3>
                      <p>Calle XXX</p>
                    </div>
                  </div>
                  <div className='contact-social-media'>
                    <SocialNetwork id={'miniInstagram'} className={'mini'} />
                    <SocialNetwork
                      id={'miniFacebook'}
                      href={'https:/es-es.facebook.com/'}
                      className={'mini'}
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className='contacta-bg2'></div>
            <div className='contacta-bg3'></div>
          </>
        }
      />
    </>
  );
};

export default ModalContactanos;
