
// Name: Adeena Akram
// Registration No: 2500605

function Card({ children, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

export default Card;
