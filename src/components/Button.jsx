
// Name: Adeena Akram
// Registration No: 2500605

function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = ""
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
