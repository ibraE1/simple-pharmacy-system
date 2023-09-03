const Button = ({ handleClick, children, type, disabled }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className="px-4 py-2 mt-2 text-white rounded-lg bg-sky-400 disabled:bg-sky-100"
    >
      {children}
    </button>
  );
};

export default Button;
