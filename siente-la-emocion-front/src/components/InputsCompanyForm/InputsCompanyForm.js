// ## Style ##
import './inputCompanyForm.css';

//Funciones, 'Componentes' que pintaremos en CompanyForm unicamente, pero como son muchos decidimos separarlos en otro fichero
const Company = ({ companyName, setCompanyName, placeholder }) => {
  const valueCompanyName = (event) => {
    setCompanyName(event.target.value);
  };
  return (
    <div className='companyForm '>
      <label>
        Nombre compañia:
        <input
          type={'text'}
          value={companyName}
          onChange={valueCompanyName}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
const ExperiencesCategory = ({
  companyCategory,
  setCompanyCategory,
  placeholder,
}) => {
  const valueCompanyCategory = (event) => {
    setCompanyCategory(event.target.value);
  };
  return (
    <div className='companyForm '>
      <label>
        Categoria:
        <input
          type={'text'}
          value={companyCategory}
          onChange={valueCompanyCategory}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
const CapacityCompany = ({
  companyCapacity,
  setCompanyCapacity,
  placeholder,
}) => {
  const valueCompanyCapacity = (event) => {
    setCompanyCapacity(event.target.value);
  };
  return (
    <div className='companyForm '>
      <label>
        Capacidad:
        <input
          type={'text'}
          value={companyCapacity ? companyCapacity : placeholder}
          onChange={valueCompanyCapacity}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
const PriceCompany = ({ companyPrice, setCompanyPrice, placeholder }) => {
  const valueCompanyPrice = (event) => {
    setCompanyPrice(event.target.value);
  };
  return (
    <div className='companyForm '>
      <label>
        Precio:
        <input
          type={'text'}
          value={companyPrice ? companyPrice : placeholder}
          onChange={valueCompanyPrice}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
const DateCompany = ({ companyDate, setCompanyDate, placeholder }) => {
  const valueCompanyDate = (event) => {
    setCompanyDate(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Fecha:
        <input
          type={'datetime-local'}
          value={companyDate ? companyDate : placeholder}
          onChange={valueCompanyDate}
          required
        />
      </label>
    </div>
  );
};
const CityCompany = ({ companyCity, setCompanyCity, placeholder }) => {
  const valueCompanyCity = (event) => {
    setCompanyCity(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Ciudad:
        <input
          type={'text'}
          value={companyCity ? companyCity : placeholder}
          onChange={valueCompanyCity}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
const DirectionCompany = ({
  companyDirection,
  setCompanyDirection,
  placeholder,
}) => {
  const valueCompanyDirection = (event) => {
    setCompanyDirection(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Direccion:
        <input
          type={'text'}
          value={companyDirection ? companyDirection : placeholder}
          onChange={valueCompanyDirection}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};

const Text1Company = ({ companyText_1, setCompanyText_1, placeholder }) => {
  const valueCompanyText_1 = (event) => {
    setCompanyText_1(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 1:
        <textarea
          type={'text'}
          value={companyText_1 ? companyText_1 : placeholder}
          onChange={valueCompanyText_1}
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
};
const Text2Company = ({ companyText_2, setCompanyText_2, placeholder }) => {
  const valueCompanyText_2 = (event) => {
    setCompanyText_2(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 2:
        <textarea
          type={'text'}
          value={companyText_2 ? companyText_2 : placeholder}
          onChange={valueCompanyText_2}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
const Text3Company = ({ companyText_3, setCompanyText_3, placeholder }) => {
  const valueCompanyText_3 = (event) => {
    setCompanyText_3(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 3:
        <textarea
          type={'text'}
          value={companyText_3 ? companyText_3 : placeholder}
          onChange={valueCompanyText_3}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
const Text4Company = ({ companyText_4, setCompanyText_4, placeholder }) => {
  const valueCompanyText_4 = (event) => {
    setCompanyText_4(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 4:
        <textarea
          type={'text'}
          value={companyText_4 ? companyText_4 : placeholder}
          onChange={valueCompanyText_4}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
const Text5Company = ({ companyText_5, setCompanyText_5, placeholder }) => {
  const valueCompanyText_5 = (event) => {
    setCompanyText_5(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 5:
        <textarea
          type={'text'}
          value={companyText_5 ? companyText_5 : placeholder}
          onChange={valueCompanyText_5}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
const Text6Company = ({ companyText_6, setCompanyText_6, placeholder }) => {
  const valueCompanyText_6 = (event) => {
    setCompanyText_6(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 6:
        <textarea
          type={'text'}
          value={companyText_6 ? companyText_6 : placeholder}
          onChange={valueCompanyText_6}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};
const PhotoHeader = ({ companyPhotoHeader, setCompanyPhotoHeader }) => {
  const valueCompanyPhotoHeader = (event) => {
    setCompanyPhotoHeader(event.target.files[0]);
  };
  return (
    <div className='companyPhotoHeader'>
      <label>
        Foto principal:
        <input
          type={'file'}
          onChange={valueCompanyPhotoHeader}
          required
        />
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
  Text1Company,
  Text2Company,
  Text3Company,
  Text4Company,
  Text5Company,
  Text6Company,
  PhotoHeader,
};
