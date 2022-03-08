import './Forms.css';

export const InputElement = ({ type, name }) => {
  return (
    <label className='label-element'>
      {name}
      <input
        className='input-element'
        type={type}
        name='name'
        placeholder='Escribe aquí...'
      />
    </label>
  );
};
