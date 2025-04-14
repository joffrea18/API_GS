import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Firewall() {
  const { reset } = useForm();
  const [mensajeError, setMensajeError] = useState('');

  const [ inputValue, setInput ]
  = useState({
  fabricante: '',
  modelo: '',
  costes: '', });

const [ checkboxes, setCheckboxes ]
  = useState({
  licencia: false,
  acces_uiexterior: false,
  acces_uinterior: false,
  sis_alertslogin: false,
  vpn_mfa: false,
  serv_antimalware: false,
  ips: false,
  sandboxing: false,
  email_security: false,
  detect_response: false,
  ssl_inspection: false,
  segmen_vlans: false,
  cert_confiable: false,
  automatic_backup: false,
  monit_dispositivo: false,
  vpn_limitadogeo: false,
  fil_reputacion: false,
 });

 const points = {
  fabricante: 5,
  modelo: 5,
  licencia: 5,
  acces_uiexterior: 5,
  acces_uinterior: 5,
  sis_alertslogin: 5,
  vpn_mfa: 5,
  serv_antimalware: 5,
  ips: 5,
  sandboxing: 5,
  email_security: 5,
  detect_response: 5,
  ssl_inspection: 5,
  segmen_vlans: 5,
  cert_confiable: 5,
  automatic_backup: 5,
  monit_dispositivo: 5,
  vpn_limitadogeo: 5,
  costes: 5,
  fil_reputacion: 5
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
  setCheckboxes((checkboxes) => {
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

// console.log(puntitos());

            
const totalPoints = () => {
  return calculateInputPoints() + calculateCheckboxPoints();
};

console.log(totalPoints());


  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError('');
    try {
      const response = await fetch("http://localhost:4000/firewall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
        {...inputValue,
        ...checkboxes}), 
      });
  
      if (!response.ok) {
        throw new Error("Error en conexión con el servidor")
      }
  
      const data = await response.json();
      console.log("Datos enviados exitosamente:", data);

      toast.success('Cliente registrado exitosamente');
      reset();
      window.location.href = "/switch";
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
    <div className="firewall">
    <form
      className='form'
      action='post'  >
    <h1>Firewall</h1>
    <label
      for="firewall-fabricante">
    Fabricante
    </label>
    <input
      type="text"
      id='firewall-fabricante'
      name="fabricante"
      onChange={handleInput}
      placeholder='Fabricante'
      value={inputValue.fabricante}/>
    <label
      for="firewall-modelo">
    Modelo
    </label>
    <input
      type="text"
      id='firewall-modelo'
      name="modelo"
      placeholder='Modelo'
      onChange={handleInput}
      value={inputValue.modelo}/>
    <br/>
    {/* LICENCIA prela los demás checkboxes */}
    <label htmlFor="">
    <input
      type="checkbox"
      name="ips"
      value={checkboxes.ips}
      onChange={handleCheckbox}
      /> IPS
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="licencia"
      value={checkboxes.licencia}
      onChange={handleCheckbox}
    /> Licencia
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="sandboxing"
      value={checkboxes.sandboxing}
      onChange={handleCheckbox}
      /> SandBoxing
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="email_security"
      value={checkboxes.email_security}
      onChange={handleCheckbox}
      /> Email Security
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="ssl_inspection"
      value={checkboxes.ssl_inspection}
      onChange={handleCheckbox}
      /> SSL Inspection
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="sis_alertslogin"
      value={checkboxes.sis_alertslogin}
      onChange={handleCheckbox}
      /> Sistema de alertas Login
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="serv_antimalware"
      value={checkboxes.serv_antimalware}
      onChange={handleCheckbox}
      /> Servicios Anti-Malware
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="fil_reputacion"
      value={checkboxes.fil_reputacion}
      onChange={handleCheckbox}
      /> Filtros de reputación
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="detect_response"
      value={checkboxes.detect_response}
      onChange={handleCheckbox}
      /> Detection & Response
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="cert_confiable"
      value={checkboxes.cert_confiable}
      onChange={handleCheckbox}
      /> Certificado confiable
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="monit_dispositivo"
      value={checkboxes.monit_dispositivo}
      onChange={handleCheckbox}
      /> Monitoreo del dispositivo
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="segmen_vlans"
      value={checkboxes.segmen_vlans}
      onChange={handleCheckbox}
      /> Segmentación por VLANs
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="acces_uiexterior"
      value={checkboxes.acces_uiexterior}
      onChange={handleCheckbox}
      /> Acceso UI desde IP exterior
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="acces_uinterior"
      value={checkboxes.acces_uinterior}
      onChange={handleCheckbox}
      /> Acceso UI desde puerto interior
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="vpn_mfa"
      value={checkboxes.vpn_mfa}
      onChange={handleCheckbox}
      /> VPN protocolo seguro & MFA
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="automatic_backup"
      value={checkboxes.automatic_backup}
      onChange={handleCheckbox}
      /> Backup automático ≤ 1 semana
    </label>
    <label htmlFor="">
    <input
      type="checkbox"
      name="vpn_limitadogeo"
      value={checkboxes.vpn_limitadogeo}
      onChange={handleCheckbox}
      /> VPN - Limitado Geograficamente
    </label>
    <label 
    for="costs-firewall">
    <b>COSTES</b>
    </label>
    <input
      type="text"
      id='costs-firewall'
      name="costes"
      onChange={handleInput}
      placeholder='Adjuntar
      presupuestos de los
      Firewalls'
      value={inputValue.costes} />
    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
    <p>Puntos Firewall: {totalPoints()}</p>
    <p>Puntos API: {puntitos()}</p>
    <button
      variant='contained'
      type="button" 
      onClick={onSubmit}
      className="btn btn-primary">
    NEXT Switch
   </button>
    </form>
    </div>
  );
}

export default Firewall;
