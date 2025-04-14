import React from 'react';
import './App.css';
import Navbar from './components/SideBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacto from './pages/Contacto';
import Welcome from './components/Welcome/Welcome';
import Routers from './pages/Routers';
import Firewall from './pages/Firewall';
import Login from './pages/Login';
import Switch from './pages/Switch';
import NotFound from './pages/NotFound';
import AccessPoint from './pages/Accesspoint';
import XDR from './pages/XDR';
import Servidores from './pages/Servidores';
import PrinterOption from './context/PrinterOption';
import Sai from './pages/Sai';
import Almacenamiento from './pages/Almacenamiento';
import Erp from './pages/Erp';
import Footer from './components/Footer/Footer';


function App(points) {
  return (
    <>
    <Router>
    <Navbar />
    <Routes>
    <Route path='/' element={ <Welcome />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/contacto' element={<Contacto />} />
    <Route path='/router' element={<Routers />} />
    <Route path='/firewall' element={<Firewall />} />
    <Route path='/switch' element={<Switch />} />
    <Route path='/accesspoint' element={<AccessPoint />} />
    <Route path='/xdr' element={<XDR />} />
    <Route path='/servidores' element={<Servidores />} />
    <Route path='/sai' element={<Sai />} />
    <Route path='/almacenamiento' element={<Almacenamiento />} />
    <Route path='/erp' element={<Erp />} />
    {/* <Route path='/impresoras' component={impresoras} /> */}
    <Route path='/printReport' element={<PrinterOption />} />
    <Route path='*' element={<NotFound />} />
    </Routes>
    {/* <BarChart data={points} /> */}
    {/* </ PointsProvider> */}
    <Footer />
    </Router>
    </>
  );
}

export default App;
