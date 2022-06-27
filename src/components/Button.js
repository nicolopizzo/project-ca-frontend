import "./Button.css";

export const Button = ({ color, fontSize = 14, text, onClick }) => {
  return (
    <div>
      <button
        style={{ backgroundColor: color, fontSize: fontSize }}
        className="btn"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
