import { useState } from 'react';
import useUser from '../../hooks/useUser';
import {
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
} from '../../components/InputsCompanyForm/InputsCompanyForm';
import decode from 'jwt-decode';

function CompanyForm() {
  const { token } = useUser();
  const [faltanCampos, setFaltanCampos] = useState(false) 

  const [companyName, setCompanyName] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  const [companyCapacity, setCompanyCapacity] = useState('');
  const [companyPrice, setCompanyPrice] = useState('');
  const [companyDate, setCompanyDate] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyDirection, setCompanyDirection] = useState('');
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
      /* const decoded = decode(token); */

      const dataCompany = {
        companyName: companyName,
        categoryName: companyCategory,
        capacity: companyCapacity,
        price: companyPrice,
        date: companyDate,
        city: companyCity,
        direction: companyDirection,
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
            Authorization: token,
            'Content-type': 'application/json',
          },
        }
      );
      const body = await response.json();
      console.log(body);

      if (response.ok) {
        console.log('hasta aqui funciona');
        setFaltanCampos(false)
      } else {
        console.error('Error', body.message);
        alert(`${body.message} o rellendaos incorrectamente`);
        setFaltanCampos(true)
        /* const prueba = document.querySelector('#companyForm')
        prueba.innerHTML=`
        <div>hola no funciono</div>        
        ` */
      }
    } catch (error) {
      console.error('catch', error);
    }
  };
  if(!token) { return <div>No te has registrado</div>}

  const decoded = decode(token);

  return (
    <>
      {decoded.id === 1 && decoded.role === 'admin' ? (
        <div id='companyForm'>
          <form onSubmit={sendForm}>
          {console.log('faltan campos', faltanCampos)}
            <Company
              companyName={companyName}
              setCompanyName={setCompanyName}
              faltanCampos={faltanCampos}
            />
            <ExperiencesCategory
              companyCategory={companyCategory}
              setCompanyCategory={setCompanyCategory}
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
            <DirectionCompany
              companyDirection={companyDirection}
              setCompanyDirection={setCompanyDirection}
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
      ) : (
        <div>No tienes permisos</div>
      )}
    </>
  );
}

export default CompanyForm;

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
