import './style.css';
export default function Brick({ name, id, handleAddCart }) {
  return (
    <div className="cards">
      <div className="details">
        <p>{name}</p>
        <button onClick={() => handleAddCart(id)}>Agregar al carrito</button>
      </div>
    </div>
  );
}
