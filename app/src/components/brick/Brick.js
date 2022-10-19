import './style.css';
export default function Brick({ name }) {
  return (
    <div className="cards">
      <div className="details">
        <p>{name}</p>
        <button>Agregar al carrito</button>
      </div>
    </div>
  );
}
