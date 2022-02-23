import './Forms.css';

export const InputElement = (props) => {
  return (
    <label className='label-element'>
      {props.name}
      <input
        className='input-element'
        type='text'
        name='name'
        placeholder='Escribe aquí...'
      />
    </label>
  );
};
