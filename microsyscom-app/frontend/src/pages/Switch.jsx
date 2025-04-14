import { React , useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const SwitchInfo = ( ) => {

const { reset } = useForm();
const [ mensajeError, setMensajeError ] = useState('');
// const { setPoints } = usePoints();

const [ inputValue, setInput ]
 = useState({
 fabricante: '',
 modelo: '',
 apuntes: '',
 costes: '' });

const [ checkboxes, setChexboxes ]
  = useState({
    licencia: false,
    anti_storm: false,
    segment_vlans: false,
    gest_aislada: false,
    automatic_backup: false,
    monitoreo_disp: false
  });


const points = {
  fabricante: 9, 
  modelo: 9,  
  licencia: 9,  
  anti_storm: 9,  
  gest_aislada: 9,  
  monitoreo_disp: 5,  
  segment_vlans: 9,  
  automatic_backup: 9,  
  costes: 5, 
  apuntes: 9  
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

console.log(checkboxes);


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

const calculateCheckboxPoints = () => {
  let totalPoints = 0;
  // Sumar puntos de los checkboxes
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

console.log(puntitos());

            
const totalPoints = () => {
  return calculateInputPoints() + calculateCheckboxPoints();
};

console.log({inputValue});
console.log(totalPoints());


  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError('');
    try {
      const response = await fetch("http://localhost:4000/switch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
        {...inputValue,
        ...checkboxes}), 
      });
  
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
  
      const data = await response.json();
      console.log("Datos enviados exitosamente:", data);

      toast.success('Cliente registrado exitosamente');
      reset();
      window.location.href = "/accesspoint";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      if (error.response && error.response?.status === 409) {
        console.error('Error del servidor:', error.response.data);
        toast.error(error.response?.data?.error);
      } else {
        setMensajeError('Ha ocurrido un error.');
      }
    }
  };
  
return (
    <div className="switch">
    <form
      className='form'
      action='post'  >
    <h1>Switch</h1>
    <label
      for="switch-fabricante">
    Fabricante
    </label>
    <input
      type="text"
      id='switch-fabricante'
      name="fabricante"
      onChange={handleInput}
      placeholder='Fabricante'
      value={inputValue.fabricante} />
    <label
      for="switch-modelo">
    Modelo</label>
    <input
      type="text"
      id='switch-modelo'
      name="modelo"
      onChange={handleInput}
      placeholder='Modelo'
      value={inputValue.modelo} />
    <label htmlFor="">                       
    <input
      type="checkbox"
      name="licencia"
      onChange={handleCheckbox}
      value={checkboxes.licencia} />
    Licencia
    </label>
    
    <label htmlFor="">
    <input
      type="checkbox"
      name="anti_storm"
      onChange={handleCheckbox}
      value={checkboxes.anti_storm} />
    Anti-storm
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="gest_aislada"
      onChange={handleCheckbox}
      value={checkboxes.gest_aislada} />
    Gestión aislada
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="monitoreo_disp"
      onChange={handleCheckbox}
      value={checkboxes.monitoreo_disp} />
    Monitoreo del dispositivo
    </label>
    <label htmlFor="">                    
    <input
      type="checkbox"
      name="segment_vlans"
      onChange={handleCheckbox}
      value={checkboxes.segment_vlans} />
    Segmentación por VLANs
    </label>
                        
    <label htmlFor="">
    <input
     type="checkbox"
     name="automatic_backup"
     onChange={handleCheckbox}
     value={checkboxes.automatic_backup} />
    Backup automático ≤ 1 semana
    </label>
    <label 
      for="costs-switch">
    <b>COSTES</b>
    </label>
    <input
      type="textarea"
      className='text-area'
      id='costs-switch'
      name="costes"
      onChange={handleInput}
      placeholder='Adjuntar
      presupuestos de los Switch
      para las sedes que carecen
      de él'
      value={inputValue.costes} /> 
    <textarea
      name="apuntes"
      className='text-area'
      onChange={handleInput}
      placeholder='Apunta tus Notas aquí'
      value={inputValue.apuntes} />  
    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
    <p>Puntos Switch: {totalPoints()}</p>
    <p>Puntos API: {puntitos()}</p>  
    <button
  variant='contained'
  type="button" 
  onClick={onSubmit}
  className="btn btn-primary"
  style={{
    boxShadow: '10px 5px 5px black'
  }}>
    NEXT AccessPoint
   </button>
    </form>
    </div>
  );
}

export default SwitchInfo;
