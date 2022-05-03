import { useModal } from '../../hooks/useModal';
import { Modal } from '../Modal/Modal';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
import './contacto.css';
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
              <section class='contacta-section'>
                <div>
                  <h2>¿Quieres formar parte de nosotros?</h2>
                </div>
              </section>
              <section class='contacta-section'>
                <div>
                  <h2>Contacta con nosotros</h2>
                  <div class='contact-flex-data'>
                    <div class='contact-data'>
                      <h3>Llámanos</h3>
                      <p>123 456 789</p>
                    </div>
                    <div class='contact-data'>
                      <h3>Escríbenos</h3>
                      <p>emoción@gmail.com</p>
                    </div>
                    <div class='contact-data'>
                      <h3>Visítanos</h3>
                      <p>Calle XXX</p>
                    </div>
                  </div>
                  <div class='contact-social-media'>
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
            <div class='contacta-bg2'></div>
            <div class='contacta-bg3'></div>
          </>
        }
      />
    </>
  );
};

export default ModalContactanos;
