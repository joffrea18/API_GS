import React, { useState }  from 'react';
// import { useUserActions } from '../../hooks/api';
import './Welcome.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Welcome = () => {
  const { reset } = useForm();
  const [mensajeError, setMensajeError] = useState('');

  const [inputValue, setInput] = useState(
    {
      dominio: '',
      telefono: ''
    }
  );


 // Manejar cambios en los inputs
 const handleInputChange = (e) => {
 const { name, value } = e.target;
 setInput((prevData) => {
 const updatedData = { ...prevData, [name]: value };
 sessionStorage.setItem("contactoForm", JSON.stringify(updatedData)); // Guardar en sessionStorage
 return updatedData;
 });
 };

  const onSubmit = async (formData) => {
    setMensajeError('');
    try {
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });

      if (!response.ok) throw new Error("Error en la solicitud de conexión con el servidor");
      const data = await response.json();
      console.log("Cliente registrado con éxito", data);
      
      toast.success('Cliente validado exitosamente');
      reset();
      window.location.href = "/contacto";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      if (error.response && error.response?.status === 409) {
        console.error('Error del servidor:', error.response.data);
        toast.error(error.response?.data?.error);
      } else {
        window.location.href = "/login";
        setMensajeError('Error en el envío de datos en al servidor. Verifique nuevamente');
      }
    }
  };

  return (
    <div>
    <form className="container">
    <h1>¡WELCOME!</h1>
    <section>
    <label>Nombre de la Empresa</label>
    <input
      type="text"
      name="dominio"
      className="input_welcome"
      value={inputValue.dominio}
      onChange={handleInputChange}
      placeholder="*Dominio / Business nombre"
    />
    </section>
    <section>
    <input
      type="telefono"
      name="telefono"
      className="input_welcome"
      value={inputValue.telefono}
      onChange={handleInputChange}
      placeholder="*Teléfono"
    />
    </section>
    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
    <button type="button"
    className="btn-welcome"
    onClick={onSubmit}>Agregar y Continuar
    </button>
    </form>
    </div>
  );
};

export default Welcome;
