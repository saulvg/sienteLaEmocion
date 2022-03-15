import './Forms.css';

export const InputElement = ({
  type,
  labelName,
  id,
  value,
  name,
  onChange,
}) => {
  return (
    <label className='label-element'>
      {labelName}
      <input
        className='input-element'
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder='Escribe aquí...'
      />
    </label>
  );
};
