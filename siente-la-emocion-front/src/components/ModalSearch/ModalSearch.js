import useFilterActivities from '../../hooks/useFilterActivities';

const ModalSearch = () => {
  return <div onClick={modal}>Buscador</div>;
};
export default ModalSearch;

const modal = () => {
  const modalBg = document.querySelector('#modal-bg-Search');
  const modalFg = document.querySelector('#modal-fg-Search');
  modalBg.classList.toggle('show');
  modalFg.innerHTML = `
    <input id='inputSearch' type='search' placeholder='Que estas buscando'></input>
      
    `;

  const inputSearch = document.querySelector('#inputSearch');
  inputSearch.focus();

  //const textValue = inputSearch.value;
  inputSearch.addEventListener('keyup', (event) => {
    let tecla = event.keyCode;
    if (tecla === 13) {
      console.log(inputSearch.value);
      inputSearch.style.display = 'none'; //
    }
  });
  return inputSearch.value;
};
