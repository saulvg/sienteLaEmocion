import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalSearch = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/?search=${searchTerm}`);
  };

  return (
    <>
      <form onSubmit={onFormSubmit} id='inputSearch'>
        <input
          type='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>🔎</button>
      </form>
    </>
  );
};
export default ModalSearch;
