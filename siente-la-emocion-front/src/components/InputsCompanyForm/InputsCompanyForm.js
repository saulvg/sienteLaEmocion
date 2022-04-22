// ## Style ##
import './inputCompanyForm.css';
import '../Forms/Forms.css';
//Funciones, 'Componentes' que pintaremos en CompanyForm unicamente, pero como son muchos decidimos separarlos en otro fichero
const Company = ({ companyName, setCompanyName }) => {
  const valueCompanyName = (event) => {
    setCompanyName(event.target.value);
  };
  return (
    <label className='label-element'>
      Nombre compañia:
      <input
        className='input-element'
        type={'text'}
        value={companyName}
        onChange={valueCompanyName}
        required
      />
    </label>
  );
};
const ExperiencesCategory = ({ companyCategory, setCompanyCategory }) => {
  const valueCompanyCategory = (event) => {
    setCompanyCategory(event.target.value);
  };
  return (
    <label className='label-element'>
      Categoria:
      <input
        className='input-element'
        type={'text'}
        value={companyCategory}
        onChange={valueCompanyCategory}
        required
      />
    </label>
  );
};
const CapacityCompany = ({ companyCapacity, setCompanyCapacity }) => {
  const valueCompanyCapacity = (event) => {
    setCompanyCapacity(event.target.value);
  };
  return (
    <label className='label-element'>
      Capacidad:
      <input
        className='input-element'
        type={'text'}
        value={companyCapacity}
        onChange={valueCompanyCapacity}
        required
      />
    </label>
  );
};
const PriceCompany = ({ companyPrice, setCompanyPrice }) => {
  const valueCompanyPrice = (event) => {
    setCompanyPrice(event.target.value);
  };
  return (
    <label className='label-element'>
      Precio:
      <input
        className='input-element'
        type={'text'}
        value={companyPrice}
        onChange={valueCompanyPrice}
        required
      />
    </label>
  );
};
const DateCompany = ({ companyDate, setCompanyDate }) => {
  const valueCompanyDate = (event) => {
    setCompanyDate(event.target.value);
  };
  return (
    <label className='label-element'>
      Fecha:
      <input
        className='input-element'
        type={'datetime-local'}
        value={companyDate.replace('Z', '')}
        onChange={valueCompanyDate}
        required
      />
    </label>
  );
};
const CityCompany = ({ companyCity, setCompanyCity }) => {
  const valueCompanyCity = (event) => {
    setCompanyCity(event.target.value);
  };
  return (
    <label className='label-element'>
      Ciudad:
      <input
        className='input-element'
        type={'text'}
        value={companyCity}
        onChange={valueCompanyCity}
        required
      />
    </label>
  );
};
const DirectionCompany = ({ companyDirection, setCompanyDirection }) => {
  const valueCompanyDirection = (event) => {
    setCompanyDirection(event.target.value);
  };
  return (
    <label className='label-element'>
      Direccion:
      <input
        className='input-element'
        type={'text'}
        value={companyDirection}
        onChange={valueCompanyDirection}
        required
      />
    </label>
  );
};

const CompanyInstagram = ({ companyInstagram, setCompanyInstagram }) => {
  const valueCompanyInstagram = (event) => {
    setCompanyInstagram(event.target.value);
  };
  return (
    <label>
      Enlace Instagram:
      <input
        type={'text'}
        value={companyInstagram}
        onChange={valueCompanyInstagram}
      />
    </label>
  );
};
const CompanyFacebook = ({ companyFacebook, setCompanyFacebook }) => {
  const valueCompanyFacebook = (event) => {
    setCompanyFacebook(event.target.value);
  };
  return (
    <label>
      Enlace Facebook:
      <input
        type={'text'}
        value={companyFacebook}
        onChange={valueCompanyFacebook}
      />
    </label>
  );
};

const Text1Company = ({ companyText_1, setCompanyText_1 }) => {
  const valueCompanyText_1 = (event) => {
    setCompanyText_1(event.target.value);
  };
  return (
    <label className='label-element'>
      Texto 1:
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={'text'}
        value={companyText_1}
        onChange={valueCompanyText_1}
        required
      />
    </label>
  );
};
const Text2Company = ({ companyText_2, setCompanyText_2 }) => {
  const valueCompanyText_2 = (event) => {
    setCompanyText_2(event.target.value);
  };
  return (
    <label className='label-element'>
      Texto 2:
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={'text'}
        value={companyText_2}
        onChange={valueCompanyText_2}
      />
    </label>
  );
};
const Text3Company = ({ companyText_3, setCompanyText_3 }) => {
  const valueCompanyText_3 = (event) => {
    setCompanyText_3(event.target.value);
  };
  return (
    <label className='label-element'>
      Texto 3:
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={'text'}
        value={companyText_3}
        onChange={valueCompanyText_3}
      />
    </label>
  );
};
const Text4Company = ({ companyText_4, setCompanyText_4 }) => {
  const valueCompanyText_4 = (event) => {
    setCompanyText_4(event.target.value);
  };
  return (
    <label className='label-element'>
      Texto 4:
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={'text'}
        value={companyText_4}
        onChange={valueCompanyText_4}
      />
    </label>
  );
};
const Text5Company = ({ companyText_5, setCompanyText_5 }) => {
  const valueCompanyText_5 = (event) => {
    setCompanyText_5(event.target.value);
  };
  return (
    <label className='label-element'>
      Texto 5:
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={'text'}
        value={companyText_5}
        onChange={valueCompanyText_5}
      />
    </label>
  );
};
const Text6Company = ({ companyText_6, setCompanyText_6 }) => {
  const valueCompanyText_6 = (event) => {
    setCompanyText_6(event.target.value);
  };
  return (
    <label className='label-element'>
      Texto 6:
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={'text'}
        value={companyText_6}
        onChange={valueCompanyText_6}
      />
    </label>
  );
};
const PhotoHeader = ({ companyPhotoHeader, setCompanyPhotoHeader }) => {
  const valueCompanyPhotoHeader = (event) => {
    setCompanyPhotoHeader(event.target.files[0]);
  };
  return (
    <div className='companyPhotoHeader'>
      <label className='label-element'>
        Foto principal:
        <input type={'file'} onChange={valueCompanyPhotoHeader} required />
      </label>
    </div>
  );
};

export {
  Company,
  ExperiencesCategory,
  CapacityCompany,
  PriceCompany,
  DateCompany,
  CityCompany,
  DirectionCompany,
  CompanyInstagram,
  CompanyFacebook,
  Text1Company,
  Text2Company,
  Text3Company,
  Text4Company,
  Text5Company,
  Text6Company,
  PhotoHeader,
};
