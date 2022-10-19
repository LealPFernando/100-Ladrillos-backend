import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [bricks, setBricks] = useState([]);

  useEffect(() => {
    const response = async () => {
      const { data } = await axios.post('http://localhost:3001/shopping-cart', {
        user: Cookies.get('user'),
      });
      setBricks(data);
    };
    try {
      response();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleRemove = () => {};
  return (
    <Fragment>
      <Navbar />
      <div className="cart-items">
        {cart.map((item) => (
          <div>
            <p>{item.name}</p>
            <button onClick={handleRemove}>Remove</button>
          </div>
        ))}
      </div>
      <button>Checkout</button>
    </Fragment>
  );
}
