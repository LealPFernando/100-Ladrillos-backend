import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav_box">
        <span className="my_shop" onClick={() => navigate('/home')}>
          Home
        </span>
        <div className="my_shop" onClick={() => navigate('/cart')}>
          Cart
        </div>
      </div>
    </nav>
  );
}
