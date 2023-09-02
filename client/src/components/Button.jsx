const Button = ({ handleClick, children }) => {
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 mt-2 text-white rounded-lg bg-sky-400"
    >
      {children}
    </button>
  );
};

export default Button;
