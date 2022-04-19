import './contacto.css';
const ModalContactanos = () => {
  return (
    <>
      <button className='nav-button' id='contact' onClick={modal}>
        Contactanos
      </button>
    </>
  );
};
export default ModalContactanos;

const modal = () => {
  const modalBg = document.querySelector('#modal-bg');
  const modalFg = document.querySelector('#modal-fg');
  modalBg.classList.add('show');
  modalFg.innerHTML = `
  <div class="contacta-bg">
  <section class="contacta-section">
    <div>
        <h2>¿Quieres formar parte de nosotros?</h2>
    </div>
    </section>
    <section class="contacta-section">
    <div>
        <h2>Contacta con nosotros</h2>
        <div class="contact-flex-data">
          <div class="contact-data">
          <h3>Llámanos</h3>
          <p>123 456 789</p>
          </div>
          <div class="contact-data">
          <h3>Escríbenos</h3>
          <p>emoción@gmail.com</p>
          </div>
          <div class="contact-data">
          <h3>Visítanos</h3>
          <p>Calle XXX</p>
          </div>
        </div>
        <div class="contact-social-media">
          <img src="https://w7.pngwing.com/pngs/101/661/png-transparent-logo-computer-icons-youtube-organization-youtube-logo-linkedin-symbol.png"
          <img src="https://w7.pngwing.com/pngs/101/661/png-transparent-logo-computer-icons-youtube-organization-youtube-logo-linkedin-symbol.png"
          <img src="https://w7.pngwing.com/pngs/101/661/png-transparent-logo-computer-icons-youtube-organization-youtube-logo-linkedin-symbol.png"
        </div>
    </div>
    </section>
    </div>
  <div class="contacta-bg2"></div>
  <div class="contacta-bg3"></div>
    
    
  `;

  const hideModal = () => modalBg.classList.remove('show');
  modalBg.addEventListener('click', hideModal);
  modalFg.addEventListener('click', (event) => event.stopPropagation());
};
