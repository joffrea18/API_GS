import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Contacto() {
  
  const { reset } = useForm();
  const [mensajeError, setMensajeError] = useState('');

  const [inputValue, setInput] = useState({
    companyName: "",
    businessActivity: "",
    contactPerson: "",
    email: "",
    phone: "",
    department: "",
    date: "",
    time: "",
  });

  const points = {
    companyName: 15, // Puntos para el nombre de la empresa
    businessActivity: 10, // Puntos para la actividad comercial
    contactPerson: 10, // Puntos para la persona de contacto
    email: 15, // Puntos para el correo
    phone: 10, // Puntos para el teléfono
    department: 10, // Puntos para el departamento
    date: 15, // Puntos para la fecha
    time: 15, // Puntos para la hora
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      // sessionStorage.setItem("contactForm", JSON.stringify(updatedData));
      
      (
        () => {
          const sumPoints = points;
          const localPoints = JSON.stringify(sumPoints);
          localStorage.setItem('point', localPoints);
        }
      )()

      return updatedData;
    });
  };



  const calculateTotalPoints = () => {
    let totalPoints = 0;
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


  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError('');
    try {
      const response = await fetch("http://localhost:4000/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue), // Convertimos el objeto inputValue a JSON
      });
      
      if (!response.ok) {
        throw new Error("Error en la solicitud de conexión con el servidor ");
      }
  
      const data = await response.json();
      console.log("Datos enviados exitosamente:", data);

      toast.success('Datos registrados exitosamente');
      reset();
      window.location.href = "/router";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      if (error.response && error.response?.status === 409) {
        console.error('Error del servidor:', error.response.data);
        toast.error(error.response?.data?.error);
      } else {
        setMensajeError('Ha ocurrido un error. Por favor cumplimente todos los datos');
      }
    }
  };

  return (
    <div className="form">
    <h1>Contacto</h1>
    <form>
    <label>Nombre de la Empresa</label>
    <input
      type="text"
      name="companyName"
      value={inputValue.companyName}
      onChange={handleInputChange}
      placeholder="Ingresa el nombre de la empresa"
      autoComplete="off"
      
    />
    <label>Actividad Comercial</label>
    <input
      type="text"
      name="businessActivity"
      value={inputValue.businessActivity}
      onChange={handleInputChange}
      placeholder="Ingresa la actividad comercial"
      
    />
    <label>Persona que aporta la información</label>
    <input
      type="text"
      name="contactPerson"
      value={inputValue.contactPerson}
      onChange={handleInputChange}
      placeholder="Ingresa el nombre del contacto"
     
    />
    <label>Correo de Contacto</label>
    <input
      type="email"
      name="email"
      value={inputValue.email}
      onChange={handleInputChange}
      placeholder="Ingresa el correo electrónico"
      
      />
    <label>Teléfono de Contacto</label>
    <input
      type="tel"
      name="phone"
      value={inputValue.phone}
      onChange={handleInputChange}
      placeholder="Ingresa el número de teléfono"
    />
    <label>Departamento</label>
    <input
      type="text"
      name="department"
      value={inputValue.department}
      onChange={handleInputChange}
      placeholder="Ingresa el departamento"
    />
    <label>Fecha *</label>
    <input
      type="date"
      name="date"
      value={inputValue.date}
      onChange={handleInputChange}
    />
    <label>Hora *</label>
    <input
      type="time"
      name="time"
      value={inputValue.time}
      onChange={handleInputChange}
    />
    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
    <p>Puntos Contacto: {calculateTotalPoints()}</p>
    <p>Puntos API: {puntitos()}</p>
    <button
      variant='contained'
      type="button" 
      onClick={onSubmit}
      className="btn btn-primary">
    NEXT Router
   </button>
  </form>
    </div>
  );
}

export default Contacto;
