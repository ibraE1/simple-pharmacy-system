const FormInput = ({ type, id, name, placeholder, value, handleChange }) => {
  return (
    <input
      className="w-full px-4 py-2 border rounded-md placeholder-slate-300 focus:placeholder-sky-400 border-slate-200 outline-sky-400"
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
