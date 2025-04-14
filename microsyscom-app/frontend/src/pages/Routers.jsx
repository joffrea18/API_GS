import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Routers = () => {

const { reset } = useForm();
const [mensajeError, setMensajeError] = useState('');
    
const [ inputValue, setInput ] = useState({ isp: false,
  isp_backup: '',
  telefono: '',
  telefono_backup: '',
  ip_estatica: '',
  ip_estatica_backup: '',
  costes: '' });
        
const [ checkboxes, setChexboxes ] =
  useState({ fibra_backup: false
  });
            
const points = {
  isp: 10, // Puntos para ISP
  telefono: 10,  // Puntos para Teléfono asociado
  ip_estatica: 11,  // Puntos para IP Estática
  isp_backup: 13,  // Puntos para ISP de Backup
  telefono_backup: 13,  // Puntos para Teléfono de Backup
  ip_estatica_backup: 13,  // Puntos para IP Estática de Backup
  fibra_backup: 10,
  costes: 10,  // Puntos para IP estática
 // Total 100
};
      
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
            
const handleCheckbox = (e) => {
  const { name, checked } = e.target;
  setChexboxes((checkboxes) => {
    const updatedData = {...checkboxes,[name]: checked};

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
    totalPoints += points[key]; // Sumar puntos si hay valor en el input
  }
});
                
  return totalPoints;
};
            
const calculateCheckboxPoints = () => {
  let totalPoints = 0;
  Object.keys(checkboxes).forEach((key) => {
    if (checkboxes[key]) {
      totalPoints += points[key]; // Sumar puntos si el checkbox está activo
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
  return calculateInputPoints() + calculateCheckboxPoints();
};


const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError('');
    try {
      const response = await fetch("http://localhost:4000/router", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...inputValue, // Combinar inputValue
          ...checkboxes  // y checkboxes en un solo objeto
        }), // Convertimos el objeto formData a JSON
      });
      
      if (!response.ok) {
        throw new Error("Error en la solicitud de conexión con el servidor ");
      }
  
      const data = await response.json();
      console.log("Datos enviados exitosamente:", data);

      toast.success('Datos enviados exitosamente');
      reset();
      // localStorage.removeItem("points");
      window.location.href = "/firewall";
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
    <div >
    <form action="post"
    className='form'>
    <section
      className="category-card" id="router">
    <h1>Router</h1>
    </section>

    <label
      for="router-isp"
    >ISP
    </label>
    <select
    name='isp'
    className='desplegable'
    value={inputValue.isp}
    onChange={handleInput}
   >
    <option value="" >Select one of the Options</option>
    <option value="1" >Adamo</option>
    <option value="2" >Amena</option>
    <option value="3" >Euskaltel</option>
    <option value="4" >Jazztel</option>
    <option value="5" >Masmovil</option>
    <option value="6" >Movistar</option>
    <option value="7" >Vodafone</option>
    <option value="8" >Ono</option>
    <option value="9" >Orange</option>
    <option value="10" >Rcable</option>
    <option value="11" >Yoigo</option>
    <option value="12" >Voztelecom</option>
    <option value="13" >Lebara</option>
    <option value="14" >LCR</option>
    <option value="15">Lowi</option>
    <option value="16" >Digi</option>
    <option value="17" >Lyca</option>
    </select>
    <label>
    ISP Backup
    </label>
    <input
      type="text"
      name="isp_backup"
      onChange={handleInput}
      placeholder='ISP de Backup'
      value={inputValue.isp_backup}/>
    <label for="router-telefono">
    Teléfono asociado</label>
    <input
      type="text"
      id="router-telefono"
      name="telefono"
      onChange={handleInput}
      placeholder='Teléfono asociado'
      value={inputValue.telefono}/>
    <label for="backup-telefono">
    Teléfono de Backup</label>

    <input
      type="text"
      id="backup-telefono"
      name="telefono_backup"
      onChange={handleInput}
      placeholder='Teléfono de Backup'
      value={inputValue.telefono_backup}/>
    <label for="router-ip">
    IP Estática</label>
    <input
      type="text"
      id="router-ip"
      name="ip_estatica"
      onChange={handleInput}
      placeholder='IP Estática'
      value={inputValue.ip_estatica}/>
    <label for="backup-ip">
    IP Estática de Backup</label>
    <input
      type="text"
      id="backup-ip"
      name="ip_estatica_backup"
      onChange={handleInput}
      placeholder='IP Estática de Backup'
      value={inputValue.ip_estatica_backup}/>
    <label
      for="fibra-backup">
    Fibra Backup
      
    <input
      type="checkbox"
      name="fibra_backup"
      checked={ checkboxes.fibra_backup }
      onChange={handleCheckbox}/>
    </label>
    <label
      for="costs-routers">
    <b>COSTES</b>
    </label>
    <input
      type="textarea"
      className='text-area'
      name="costes"
      id="costs-routers"
      placeholder='Adjuntar presupuestos
      de los routers de backup'
      onChange={handleInput}
      value={inputValue.costes}/>
    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
    <p>Puntos Router: {totalPoints()}</p>
    <p>Puntos API: {puntitos()}</p>

    <button
      variant='contained'
      type="button" 
      onClick={onSubmit}
      className="btn btn-primary">
    NEXT Firewall
   </button>
    </form>
    </div>
  );
}

export default Routers;
