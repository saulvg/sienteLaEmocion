const Company = ({ companyName, setCompanyName }) => {
  const valueCompanyName = (event) => {
    console.log('cambio companyId_company');
    setCompanyName(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Nombre ssss:
        <input
          id='companyName'
          type={'text'}
          value={companyName}
          onChange={valueCompanyName}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const ExperiencesCategory = ({ companyCategory, setCompanyCategory }) => {
  const valueCompanyCategory = (event) => {
    console.log('cambio id_experiences_category');
    setCompanyCategory(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Categoria:
        <input
          id='companyName'
          type={'text'}
          value={companyCategory}
          onChange={valueCompanyCategory}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const CapacityCompany = ({ companyCapacity, setCompanyCapacity }) => {
  const valueCompanyCapacity = (event) => {
    console.log('cambio companyCapacity');
    setCompanyCapacity(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Capacidad:
        <input
          id='CapacityCompany'
          type={'text'}
          value={companyCapacity}
          onChange={valueCompanyCapacity}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const PriceCompany = ({ companyPrice, setCompanyPrice }) => {
  const valueCompanyPrice = (event) => {
    console.log('cambio companyPrice');
    setCompanyPrice(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Precio:
        <input
          id='xCompany'
          type={'text'}
          value={companyPrice}
          onChange={valueCompanyPrice}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const DateCompany = ({ companyDate, setCompanyDate }) => {
  const valueCompanyDate = (event) => {
    console.log('cambio companyDate');
    setCompanyDate(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Fecha:
        <input
          id='xCompany'
          type={'text'}
          value={companyDate}
          onChange={valueCompanyDate}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const CityCompany = ({ companyCity, setCompanyCity }) => {
  const valueCompanyCity = (event) => {
    console.log('cambio companyCity');
    setCompanyCity(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Ciudad:
        <input
          id='xCompany'
          type={'text'}
          value={companyCity}
          onChange={valueCompanyCity}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const DirectionCompany = ({ companyDirection, setCompanyDirection }) => {
  const valueCompanyDirection = (event) => {
    console.log('cambio direction');
    setCompanyDirection(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Direccion:
        <input
          id='xCompany'
          type={'text'}
          value={companyDirection}
          onChange={valueCompanyDirection}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};

const Text1Company = ({ companyText_1, setCompanyText_1 }) => {
  const valueCompanyText_1 = (event) => {
    console.log('cambio companyText_1');
    setCompanyText_1(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 1:
        <input
          id='xCompany'
          type={'text'}
          value={companyText_1}
          onChange={valueCompanyText_1}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const Text2Company = ({ companyText_2, setCompanyText_2 }) => {
  const valueCompanyText_2 = (event) => {
    console.log('cambio companyText_2');
    setCompanyText_2(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 2:
        <input
          id='xCompany'
          type={'text'}
          value={companyText_2}
          onChange={valueCompanyText_2}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const Text3Company = ({ companyText_3, setCompanyText_3 }) => {
  const valueCompanyText_3 = (event) => {
    console.log('cambio companyText_3');
    setCompanyText_3(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 3:
        <input
          id='xCompany'
          type={'text'}
          value={companyText_3}
          onChange={valueCompanyText_3}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const Text4Company = ({ companyText_4, setCompanyText_4 }) => {
  const valueCompanyText_4 = (event) => {
    console.log('cambio companyText_4');
    setCompanyText_4(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 4:
        <input
          id='xCompany'
          type={'text'}
          value={companyText_4}
          onChange={valueCompanyText_4}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const Text5Company = ({ companyText_5, setCompanyText_5 }) => {
  const valueCompanyText_5 = (event) => {
    console.log('cambio companyText_5');
    setCompanyText_5(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 5:
        <input
          id='xCompany'
          type={'text'}
          value={companyText_5}
          onChange={valueCompanyText_5}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const Text6Company = ({ companyText_6, setCompanyText_6 }) => {
  const valueCompanyText_6 = (event) => {
    console.log('cambio companyText_6');
    setCompanyText_6(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Texto 6:
        <input
          id='xCompany'
          type={'text'}
          value={companyText_6}
          onChange={valueCompanyText_6}
          placeholder={'Escribe aqui'}
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
};
