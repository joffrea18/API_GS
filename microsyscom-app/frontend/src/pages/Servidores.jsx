import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Servidores = () => {
    const { reset } = useForm();
    const [ mensajeError, setMensajeError ] = useState('');

    const [ inputValue, setInput ] = useState({
        fabricante: '',
        modelo: '',
        so: '',
        copias_segu: '',
        ips: '',
        apuntes: ''
    })

    const points = {
        fabricante: 17,
        modelo: 17,
        so: 17,
        copias_segu: 17,
        ips: 16,
        apuntes: 16
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

    Object.keys(inputValue).forEach((key) => {
        if (inputValue[key]) {
            totalPoints += points[key];
        }
    } )
    return totalPoints;
  }

  
  function puntitos () {
    const storedPoints = JSON.parse(localStorage.getItem('point')) || {}; 
    return Object.values(storedPoints).reduce((acc, val) => acc + val, 0);
  }
  
//   console.log(puntitos());
  
              
  const totalPoints = () => {
    return calculateInputPoints();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError('');
    try {
        const response = await fetch("http://localhost:4000/servidores",
           { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    ...inputValue,
                }
            ),
        }
        );

        if (!response.ok) {
            throw new Error("Error en conexión con el servidor")
        }

        const data = await response.json()
        console.log("enviado con éxito", data);
        
        toast.success('Datos registrados en BBDD')
        reset();
        window.location.href = "/sai"
    } catch (error) {
        console.log("Error en el envío d los datos:", error);
        if (error.respose && error.respose?.status === 409) {
            console.log("Error del servidor:", error.respose.data);
            toast.error(error.response?.data?.error)
        } else {
            setMensajeError("Ha ocurrido un error con la conexión en el servidor")
        }
    }

  }

    return (
        <div className='servidores'>
        <form action="post"
        className='form'>
        <section
            className="category-card" id="router">
        <h1>Servidores</h1>            
        </section>
        <label
            for="fabricante">
        Fabricante
        </label>
        <input
            type="text"
            name="fabricante"
            value={inputValue.fabricante}
            onChange={handleInput}
            placeholder='Fabricante'/>
        <label
            for="fabricante">
        Modelo
        </label>
        <input
            type="text"
            name="modelo"
            value={inputValue.modelo}
            onChange={handleInput}
            placeholder='Modelo'/>
        <label
            for="so-servidor">
        Sistema Operativo
        </label>
        <input
            type="text"
            name="so-servidor"
            value={inputValue.so}
            onChange={handleInput}
            placeholder='Sistema operativo'/>
        <label
            for="copias_segu">
        Copias de Seguridad
        </label>
        <input
            type="text"
            name="copias_segu"
            value={inputValue.copias_segu}
            onChange={handleInput}
            placeholder='Copias de Seguridad'/>
        <label
            for="ips">
        IPS</label>
        <input
            type="text"
            name="ips"
            value={inputValue.ips}
            onChange={handleInput}
            placeholder='IPS'/>
        {/* <button
            className='add-server'
            id='add-server'
            to={'/buttonppal/routerinfo'}>
        AGREGAR SERVIDOR
        </button> */}
        <input
        type="textarea"
        className='text-area'
        name="apuntes"
        id="apuntes"
        value={inputValue.apuntes}
        onChange={handleInput}
        placeholder='Indicar apuntes referente a los servidores anexados'/>
        { mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p> }
        <p>Puntos Servidores: {totalPoints()}</p>
        <p>Puntos API: {puntitos()}</p>
       <button
        variant='contained'
        type="button"
        onClick={onSubmit}
        className="btn btn-primary">
     NEXT SAI
       </button>
        </form>
        </div>
    );
}

export default Servidores;
