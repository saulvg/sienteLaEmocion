import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalSearch = () => {
  const navigate = useNavigate();

  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();

    // /search/?search=searchterm
    navigate(`/search/?search=${searchTerm}`);
  };

  // const { activities, error } = useFilterActivities();
  /*  */
  // const modal = () => {
  //   const modalBg = document.querySelector('#modal-bg-Search');
  //   const modalFg = document.querySelector('#modal-fg-Search');
  //   modalBg.classList.toggle('show');
  //   modalFg.innerHTML = `
  //     <input id='inputSearch' type='search' placeholder='Que estas buscando'></input>

  //     `;

  //   const inputSearch = document.querySelector('#inputSearch');
  //   inputSearch.focus();

  //   inputSearch.addEventListener('keyup', (event) => {
  //     let tecla = event.keyCode;
  //     if (tecla === 13) {
  //       console.log(inputSearch.value);
  //       console.log('soy modal', activities);
  //     }
  //   });
  //   /* return inputSearch.value; */
  // };
  /*  */
  return (
    <>
      <div onClick={() => setFormVisible(!formVisible)}>Buscador</div>

      {formVisible ? (
        <form onSubmit={onFormSubmit}>
          <input
            type='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>🔎</button>
        </form>
      ) : null}
    </>
  );
};
export default ModalSearch;
