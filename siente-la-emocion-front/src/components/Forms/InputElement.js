// ## Style ##
import './Forms.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState } from 'react';

//Componente input noraml, input para passwords y textArea que utilizaremso de forma generica para pintarlo por la app
export const InputElement = ({
  type,
  labelName,
  id,
  value,
  name,
  onChange,
  htmlFor,
  labelfor,
  pattern,
  placeholder,
  required,
}) => {
  return (
    <label className='label-element' htmlFor={labelfor}>
      {labelName}
      <input
        className='input-element'
        type={type}
        name={name}
        pattern={pattern}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export const InputPassword = ({
  type,
  labelName,
  id,
  value,
  name,
  onChange,
  htmlFor,
  placeholder,
  required,
}) => {
  const [togglePassword, setTogglePassword] = useState(true);
  return (
    <label className='label-element'>
      {labelName}
      <div className='flex input-element'>
        <input
          className='input-password'
          type={togglePassword ? 'password' : ''}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        <span onClick={() => setTogglePassword(!togglePassword)}>👀</span>
      </div>
    </label>
  );
};

export const TextareaElement = ({
  type,
  labelName,
  id,
  value,
  name,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <label className='label-element'>
      {labelName}
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={type}
        required={required}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};
