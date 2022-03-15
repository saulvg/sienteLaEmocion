import { useState } from 'react';

function CompanyForm() {
  const [companyId_company, setCompanyId_company] = useState('');
  const [companyId_experiences_category, setCompanyId_experiences_category] =
    useState('');
  const [companyCapacity, setCompanyCapacity] = useState('');
  const [companyPrice, setCompanyPrice] = useState('');
  const [companyDate, setCompanyDate] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyStreat, setCompanyStreat] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [companyPostalCode, setCompanyPostalCode] = useState('');
  const [companyLongitude, setCompanyLongitude] = useState('');
  const [companyLatitude, setCompanyLatitude] = useState('');
  const [companyText_1, setCompanyText_1] = useState('');
  const [companyText_2, setCompanyText_2] = useState('');
  const [companyText_3, setCompanyText_3] = useState('');
  const [companyText_4, setCompanyText_4] = useState('');
  const [companyText_5, setCompanyText_5] = useState('');
  const [companyText_6, setCompanyText_6] = useState('');
  /* const [companyPhotoHeader, setCompanyPhotoHeader] = useState(''); */

  //Creamos una funcion manejadora del boton del formulario
  const sendForm = async (event) => {
    event.preventDefault();
    //intentamos enviar los datos del formulario con una peticion de tipo POST
    try {
      const dataCompany = {
        id_company: companyId_company,
        id_experiences_category: companyId_experiences_category,
        capacity: companyCapacity,
        price: companyPrice,
        date: companyDate,
        city: companyCity,
        street: companyStreat,
        number: companyNumber,
        postalCode: companyPostalCode,
        longitude: companyLongitude,
        latitude: companyLatitude,
        text_1: companyText_1,
        text_2: companyText_2,
        text_3: companyText_3,
        text_4: companyText_4,
        text_5: companyText_5,
        text_6: companyText_6,
        /* photoHeader: companyPhotoHeader, */
      };

      //.....
      /* let file = new FormData();
      file.append('image', companyPhotoHeader); */
      //....

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences`,
        {
          method: 'POST',
          body: JSON.stringify(dataCompany),
          /* file, */
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const body = await response.json();
      console.log(body);

      if (response.ok) {
        console.log('hasta aqui funciona');
        /* setCompanyCapacity(body.)
        setCompanyPrice(body.)
        setCompanyDate(body.)
        setCompanyCity(body.)
        setCompanyStreat(body.)
        setCompanyNumber(body.)
        companyPostalCode(body.)
        setCompanyLongitude(body.)
        setCompanyLatitude(body.)
        setCompanyText_1(body.)
        setCompanyText_2(body.)
        setCompanyText_3(body.)
        setCompanyText_4(body.)
        setCompanyText_5(body.)
        setCompanyText_6(body.) */
      } else {
        console.error('Error en la llamada a la API');
      }
    } catch (error) {
      console.error('Error del catch:', error);
    }
  };

  return (
    <div id='companyForm'>
      <form onSubmit={sendForm}>
        <IdCompany
          companyId_company={companyId_company}
          setCompanyId_company={setCompanyId_company}
        />
        <IdExperiencesCategory
          companyId_experiences_category={companyId_experiences_category}
          setCompanyId_experiences_category={setCompanyId_experiences_category}
        />
        <CapacityCompany
          companyCapacity={companyCapacity}
          setCompanyCapacity={setCompanyCapacity}
        />
        <PriceCompany
          companyPrice={companyPrice}
          setCompanyPrice={setCompanyPrice}
        />
        <DateCompany
          companyDate={companyDate}
          setCompanyDate={setCompanyDate}
        />
        <CityCompany
          companyCity={companyCity}
          setCompanyCity={setCompanyCity}
        />
        <StreatCompany
          companyStreat={companyStreat}
          setCompanyStreat={setCompanyStreat}
        />
        <NumberCompany
          companyNumber={companyNumber}
          setCompanyNumber={setCompanyNumber}
        />
        <PostalCodeCompany
          companyPostalCode={companyPostalCode}
          setCompanyPostalCode={setCompanyPostalCode}
        />
        <LongitudeCompany
          companyLongitude={companyLongitude}
          setCompanyLongitude={setCompanyLongitude}
        />
        <LatitudeCompany
          companyLatitude={companyLatitude}
          setCompanyLatitude={setCompanyLatitude}
        />
        <Text1Company
          companyText_1={companyText_1}
          setCompanyText_1={setCompanyText_1}
        />
        <Text2Company
          companyText_2={companyText_2}
          setCompanyText_2={setCompanyText_2}
        />
        <Text3Company
          companyText_3={companyText_3}
          setCompanyText_3={setCompanyText_3}
        />
        <Text4Company
          companyText_4={companyText_4}
          setCompanyText_4={setCompanyText_4}
        />
        <Text5Company
          companyText_5={companyText_5}
          setCompanyText_5={setCompanyText_5}
        />
        <Text6Company
          companyText_6={companyText_6}
          setCompanyText_6={setCompanyText_6}
        />
        {/* <PhotoHeader
          companyPhotoHeader={companyPhotoHeader}
          setCompanyPhotoHeader={setCompanyPhotoHeader}
        /> */}
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default CompanyForm;

const IdCompany = ({ companyId_company, setCompanyId_company }) => {
  const valueCompanyId_company = (event) => {
    console.log('cambio companyId_company');
    setCompanyId_company(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Id Company:
        <input
          id='id_company'
          type={'text'}
          value={companyId_company}
          onChange={valueCompanyId_company}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const IdExperiencesCategory = ({
  companyId_experiences_category,
  setCompanyId_experiences_category,
}) => {
  const valueId_experiences_category = (event) => {
    console.log('cambio id_experiences_category');
    setCompanyId_experiences_category(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Id experiencia:
        <input
          id='id_company'
          type={'text'}
          value={companyId_experiences_category}
          onChange={valueId_experiences_category}
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
const StreatCompany = ({ companyStreat, setCompanyStreat }) => {
  const valueCompanyStreat = (event) => {
    console.log('cambio companyStreat');
    setCompanyStreat(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Calle:
        <input
          id='xCompany'
          type={'text'}
          value={companyStreat}
          onChange={valueCompanyStreat}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const NumberCompany = ({ companyNumber, setCompanyNumber }) => {
  const valueCompanyNumber = (event) => {
    console.log('cambio companyNumber');
    setCompanyNumber(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        NumeroPortal:
        <input
          id='xCompany'
          type={'text'}
          value={companyNumber}
          onChange={valueCompanyNumber}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const PostalCodeCompany = ({ companyPostalCode, setCompanyPostalCode }) => {
  const valueCompanyPostalCode = (event) => {
    console.log('cambio companyPostalCode');
    setCompanyPostalCode(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Codigo postal:
        <input
          id='xCompany'
          type={'text'}
          value={companyPostalCode}
          onChange={valueCompanyPostalCode}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const LongitudeCompany = ({ companyLongitude, setCompanyLongitude }) => {
  const valueCompanyLongitude = (event) => {
    console.log('cambio companyLongitude');
    setCompanyLongitude(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Longitud:
        <input
          id='xCompany'
          type={'text'}
          value={companyLongitude}
          onChange={valueCompanyLongitude}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
const LatitudeCompany = ({ companyLatitude, setCompanyLatitude }) => {
  const valueCompanyLatitude = (event) => {
    console.log('cambio companyLatitude');
    setCompanyLatitude(event.target.value);
  };
  return (
    <div className='companyForm'>
      <label>
        Latitud:
        <input
          id='xCompany'
          type={'text'}
          value={companyLatitude}
          onChange={valueCompanyLatitude}
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

//................................................
/* const PhotoHeader = ({ companyPhotoHeader, setCompanyPhotoHeader }) => {
  const valueCompanyPhotoHeader = (event) => {
    console.log(event.target);
    const fil = event.target.files[0];
    setCompanyPhotoHeader(fil);
  };
  return (
    <div className='companyPhotoHeader'>
      <label>
        Foto principal:
        <input
          id='xCompany'
          type={'file'}
          value={companyPhotoHeader}
          onChange={valueCompanyPhotoHeader}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
 */
