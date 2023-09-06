const FormInput = ({ type, id, name, placeholder, value, handleChange }) => {
  return (
    <input
      className="w-full px-4 py-2 border rounded-md placeholder-slate-300 ring-0 focus:placeholder-sky-400 border-slate-200 focus:border-sky-400 focus:ring-sky-400"
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default FormInput;
