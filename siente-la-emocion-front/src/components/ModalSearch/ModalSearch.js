import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalSearch = () => {
  const navigate = useNavigate();

  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/?search=${searchTerm}`);
  };

  return (
    <>
      <button
        className='nav-button'
        onClick={() => setFormVisible(!formVisible)}
      >
        Buscador
      </button>

      {formVisible ? (
        <form onSubmit={onFormSubmit} id='inputSearch'>
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
