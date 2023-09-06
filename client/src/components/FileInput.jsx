const FileInput = ({ type, id, name, placeholder, value, handleChange }) => {
  return (
    <input
      className="w-full px-4 py-2 border-2 rounded-md file:px-4 file:py-2 file:mt-2 file:text-white file:rounded-lg file:bg-sky-400 file:border-none focus:border-sky-400 focus:outline-sky-400"
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default FileInput;
