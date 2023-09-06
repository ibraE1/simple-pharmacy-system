const DropdownInput = ({ id, name, value, options, handleChange }) => {
  return (
    <select
      className="w-full px-4 py-2 border-2 rounded-md focus:ring-0 focus:border-sky-400 form-select placeholder-slate-300 border-slate-200 outline-sky-400"
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          defaultValue={index == 0}
          className="ring-0"
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownInput;
