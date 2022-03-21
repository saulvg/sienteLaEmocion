import { useState } from 'react';

const UpExperiencesPhotos = () => {
  const [file, setFile] = useState(null);

  const uploadFile = async (event) => {
    event.preventDefault();

    try {
      let data = new FormData();
      data.append('image', file);
      await (
        await fetch(`${process.env.REACT_APP_BACKEND}/experiences/2/photos`, {
          method: 'POST',
          body: data,
        })
      ).json();
    } catch (error) {
      console.error(error);
    }
  };
  const onFileChange = (event) => {
    console.log('llegamos');
    console.log(event.target.files[0]);
    const photo = event.target.file;
    setFile(photo);
  };
  return (
    <div className='upFiles'>
      <form onSubmit={uploadFile}>
        <label>
          Selecciona el Archivo que deseas subir
          <input type={'file'} onChange={onFileChange} />
        </label>
        <button>Subir</button>
      </form>
    </div>
  );
};

export default UpExperiencesPhotos;
