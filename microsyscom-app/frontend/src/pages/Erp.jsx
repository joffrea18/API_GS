import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Erp() {
  const { reset } = useForm();
  const [mensajeError, setMensajeError] = useState('');
  const [inputValue, setInput] = useState({
    fabricante: '',
    proveedor: '',
    apuntes: ''
  });

  const points = {
    fabricante: 35,
    proveedor: 35,
    apuntes: 30
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
    const updatedData = { ...prev, [name]: value } 
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

  const calculateInputPoints = () => {
    return Object.keys(inputValue).reduce((total, key) => {
      return inputValue[key] ? total + points[key] : total;
    }, 0);
  };

  function puntitos () {
    const storedPoints = JSON.parse(localStorage.getItem('point')) || {}; 
    return Object.values(storedPoints).reduce((acc, val) => acc + val, 0);
  }

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Reporte de Puntos ERP', 20, 10);
    
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(points),
        datasets: [{
          label: 'Puntos',
          data: Object.values(points),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      }
    });
    
    setTimeout(() => {
      const imageData = canvas.toDataURL('image/png');
      pdf.addImage(imageData, 'PNG', 20, 20, 150, 80);
      pdf.save('erp_report.pdf');
    }, 1000);
  };

  return (
    <div className='sai'>
      <form className='form'>
        <h1>ERP</h1>
        
        <label htmlFor='fabricante'>Fabricante</label>
        <input
          type='text'
          id='fabricante'
          name='fabricante'
          onChange={handleInput}
          value={inputValue.fabricante}
          placeholder='Fabricante'
        />

        <label htmlFor='proveedor'>Proveedor</label>
        <input
          type='text'
          id='proveedor'
          name='proveedor'
          onChange={handleInput}
          value={inputValue.proveedor}
          placeholder='Proveedor'
        />

        <label htmlFor='apuntes'>Apuntes</label>
        <input
          type='textarea'
          id='apuntes'
          name='apuntes'
          onChange={handleInput}
          value={inputValue.apuntes}
          placeholder='Indicar apuntes referentes a Erp'
        />

        {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}

        <p>Puntos ERP: {calculateInputPoints()}</p>
        <p>Puntos API: {puntitos()}</p>
        
        <button type='button' onClick={generatePDF} className='btn btn-primary'>
          Imprimir PDF
        </button>
      </form>
    </div>
  );
}

export default Erp;
