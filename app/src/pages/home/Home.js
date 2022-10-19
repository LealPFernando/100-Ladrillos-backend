import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Brick from '../../components/brick/Brick';
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
  console.log(bricks);
  return (
    <Fragment>
      <Navbar></Navbar>
      <section>
        {bricks.map((brick) => (
          <Brick key={brick._id} name={brick.name} />
        ))}
      </section>
    </Fragment>
  );
}
