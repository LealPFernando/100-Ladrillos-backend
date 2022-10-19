import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Brick from '../../components/brick/Brick';
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';
import './style.css';

export default function Home() {
  const [bricks, setBricks] = useState([]);

  useEffect(() => {
    const response = async () => {
      const { data } = await axios.get('http://localhost:3001/brick');
      setBricks(data);
    };
    try {
      response();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleAddCart = async (brickId) => {
    await axios.post('http://localhost:3001/shopping-cart/' + brickId, {
      user: Cookies.get('user'),
    });
    setBricks((prevBricks) =>
      prevBricks.filter((brick) => brick._id !== brickId)
    );
  };

  console.log(bricks);
  return (
    <Fragment>
      <Navbar></Navbar>
      <section>
        {bricks.map((brick) => (
          <Brick
            key={brick._id}
            id={brick._id}
            name={brick.name}
            handleAddCart={handleAddCart}
          />
        ))}
        {bricks.length === 0 && <h1>No hay ladrillos</h1>}
      </section>
    </Fragment>
  );
}
