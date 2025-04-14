import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Sai() {
  const { reset } = useForm();
  const [ mensajeError, setMensajeError ] = useState('');
  
  const [ inputValue, setInput ]
  = useState({
  fabricante: '',
  modelo: '',
  disp_conectados: '',
  ip_vlan_cloud: '',
  apuntes: '',});

  const points = {
  fabricante: 20,
  modelo: 20,
  disp_conectados: 20,
  ip_vlan_cloud: 20,
  apuntes: 20
}

const handleInput = (e) => {
  const { name, value } = e.target;
  setInput((inputValue) => {
    const updatedData = {...inputValue,[name]: value};

    (
      () => {
        const sumPoints = points;
        const localPoints = JSON.stringify(sumPoints);
        localStorage.setItem('point', localPoints);
      }
    )()

    return updatedData;
  });
}

const calculateInputPoints = () => {
  let totalPoints = 0;
  
  // Sumar puntos de los inputs
Object.keys(inputValue).forEach((key) => {
  if (inputValue[key]) {
    totalPoints += points[key]; // Sumar puntos si hay valor en el input
  }
});
                
  return totalPoints;
};

function puntitos () {
  const storedPoints = JSON.parse(localStorage.getItem('point')) || {}; 
  return Object.values(storedPoints).reduce((acc, val) => acc + val, 0);
}

// console.log(puntitos());

            
const totalPoints = () => {
  return calculateInputPoints();
};

const onSubmit = async (event) => {
  event.preventDefault();
  setMensajeError('');
  try {
    const response = await fetch("http://localhost:4000/sai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
      {...inputValue}), 
    });

    if (!response.ok) {
      throw new Error("Error en conexión con el servidor")
    }

    const data = await response.json();
    console.log("Datos enviados exitosamente:", data);
    toast.success('Datos registrados exitosamente');
    reset();
    window.location.href = "/almacenamiento";
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    if (error.response && error.response?.status === 409) {
      console.error('Error del servidor:', error.response.data);
      toast.error(error.response?.data?.error);
    } else {
      setMensajeError('Ha ocurrido un error.');
    }
  }
}

  return (
    <div className='sai'>
    <form action='post'
    className='form'>
    <h1>SAI</h1>
    <label
    for="fabricante">
    Fabricante
    </label>
    <input
      type="text"
      id='firewall-fabricante'
      name="fabricante"
      onChange={handleInput}
      value={inputValue.fabricante}
      placeholder='Fabricante'/>
    <label
    for="modelo">
    Modelo
    </label>
    <input
      type="text"
      id='modelo'
      name="modelo"
      onChange={handleInput}
      value={inputValue.modelo}
      placeholder='Modelo'/>
    <label
    for="disp_conectados">
    Dispositivos Conectados
    </label>
    <input
      type="text"
      id='disp_conectados'
      name="disp_conectados"
      onChange={handleInput}
      value={inputValue.disp_conectados}
      placeholder='Dispositivos Conectados'/>
    <label
    for="ip_vlan_cloud">
    IP & VLAN
    </label>
    <input
      type="text"
      id='ip_vlan_cloud'
      name="ip_vlan_cloud"
      onChange={handleInput}
      value={inputValue.ip_vlan_cloud}
      placeholder='IP & VLAN'/>
    <input
      type="textarea"
      id='text-area'
      name="apuntes"
      onChange={handleInput}
      value={inputValue.apuntes}
      placeholder='Indicar apuntes referente a Sai'/>
    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
    <p>Puntos Sai: {totalPoints()}</p>
    <p>Puntos API: {puntitos()}</p>
    <button
      variant='contained'
      type="button" 
      onClick={onSubmit}
      className="btn btn-primary">
    NEXT Almacenamiento
   </button>
    </form>
    </div>
  );
}

export default Sai;
