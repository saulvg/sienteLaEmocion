import React from 'react';
import './Form.css';
const InputForm = ({
  state,
  setState,
  type,
  label,
  placeholder,
  name,
  error,
  expReg,
}) => {
  // Cuando hay un cambio en el input se ejecuta esta función, que cambia
  // el estado agregando un nuevo objeto con las propiedades del estado y
  // los valores que le damos
  const onChange = (e) => {
    setState({ ...state, field: e.target.value });
  };

  // Para validar los valores introducidos
  const validation = () => {
    if (expReg) {
      // expReg es por ej userName: /^[a-zA-Z0-9_-]{4,16}$/,
      // que el username solo pueda tener esos caractéres, y aqui se
      // valida si los tiene o no
      //state es cada campo que haya, username, nombre, telefono...
      if (expReg.test(state.field)) {
        setState({ ...state, valid: 'true' });
      } else {
        setState({ ...state, valid: 'false' });
      }
    }
  };

  return (
    <div>
      <label className='label-element' htmlFor={name} valid={state.valid}>
        {label}
      </label>
      <div>
        <input
          className='input-element'
          type={type}
          placeholder={placeholder}
          id={name}
          value={state.field}
          onChange={onChange}
          onKeyUp={validation}
          onBlur={validation}
          valid={state.valid}
        />

        <div valid={state.valid} />
      </div>{' '}
      <div valid={state.valid}>{error}</div>{' '}
    </div>
  );
};

export default InputForm;
export const Textarea = ({
  state,
  setState,
  type,
  label,
  placeholder,
  name,
  error,
  expReg,
}) => {
  // Cuando hay un cambio en el input se ejecuta esta función, que cambia
  // el estado agregando un nuevo objeto con las propiedades del estado y
  // los valores que le damos
  const onChange = (e) => {
    setState({ ...state, field: e.target.value });
  };

  // Para validar los valores introducidos
  const validation = () => {
    if (expReg) {
      if (expReg.test(state.field)) {
        setState({ ...state, valid: 'true' });
      } else {
        setState({ ...state, valid: 'false' });
      }
    }
  };
  return (
    <div>
      <label className='label-element' htmlFor={name} valid={state.valid}>
        {label}
      </label>
      <div>
        <textarea
          cols='60'
          rows='10'
          className='textarea-element'
          placeholder={placeholder}
          id={name}
          value={state.field}
          onChange={onChange}
          onKeyUp={validation}
          onBlur={validation}
          valid={state.valid}
        ></textarea>
        <div valid={state.valid} />
      </div>{' '}
      <div valid={state.valid}>{error}</div>{' '}
    </div>
  );
};
