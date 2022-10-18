import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.email === '') {
      toast.error('Llenar el campo de correo', {
        position: 'bottom-right',
        theme: 'dark',
      });
      return;
    } else if (values.password === '') {
      toast.error('Llenar el campo de contraseña', {
        position: 'bottom-right',
        theme: 'dark',
      });
      return;
    }
    console.log(values);
    try {
      const { data } = await axios.post(
        'http://localhost:3001/user/login',
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data.message) {
        console.log('Error');
        toast.error('Usuario o Contraseña Incorrecta', {
          position: 'bottom-right',
          theme: 'dark',
        });
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <ToastContainer />
    </div>
  );
}
