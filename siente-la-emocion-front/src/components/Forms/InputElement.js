import './Forms.css';

export const InputElement = ({
  type,
  labelName,
  id,
  value,
  name,
  onChange,
  htmlFor,
  placeholder,
  pattern,
  labelfor,
  labelClassName,
  inputClassName,
}) => {
  return (
    <label className={labelClassName} htmlFor={labelfor}>
      {labelName}
      <input
        className={inputClassName}
        type={type}
        name={name}
        pattern={pattern}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
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
}) => {
  return (
    <label className='label-element'>
      {labelName}
      <textarea
        className='textarea-element'
        cols='100'
        rows='10'
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};
