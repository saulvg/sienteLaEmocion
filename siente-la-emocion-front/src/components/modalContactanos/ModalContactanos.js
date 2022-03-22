const ModalContactanos = () => {
  return (
    <>
      <span id='contact' onClick={lisent}>
        Contactanos
      </span>
    </>
  );
};
export default ModalContactanos;

const lisent = () => {
  const modalBg = document.querySelector('#modal-bg');
  const modalFg = document.querySelector('#modal-fg');
  modalBg.classList.add('show');
  modalFg.innerHTML = `
    <section>
        <h2>Quieres formar parte de nosotros</h2>
        <p>CORREO QUE ELIGAMOS</p>
    </section>
    <section>
        <h2>Contacta con nosotros</h2>
        <p>footer</p>
    </section>
    
  `;

  const hideModal = () => modalBg.classList.remove('show');
  modalBg.addEventListener('click', hideModal);
  modalFg.addEventListener('click', (event) => event.stopPropagation());
};
