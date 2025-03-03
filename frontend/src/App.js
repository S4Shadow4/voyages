import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from './Components/Pages/Accueil';
import Inscription from './Components/Pages/Inscription';
import Connexion from './Components/Pages/Connexion';
import Profil from './Components/Pages/Profil';
import ProtectedRoute from './Components/Pages/ProtectedRoute';
import MenuLayout from "../src/Components/Layout/Menulayout";
import AjoutAnnonce from './Components/Pages/AjoutAnnonce';
import Formation from './Components/Pages/Formations';
import AdminDashboard from './Components/Pages/AdminDashboard';
import Dashboard from './Components/Pages/Dashboard';
import AjoutLieuxTouristiques from './Components/Pages/AjoutLieuxTouristiques';
import Payement from './Components/Pages/Payement';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuLayout/>}>
            <Route index element={<Accueil/>}/>
            <Route path="/signup" element={<Inscription/>}/> 
            <Route path="/login" element={<Connexion/>}/>
          </Route>

          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/Formations" element={<Formation/>}/>
          <Route path="/ajoutFormation" element={<AjoutAnnonce/>}/>
          <Route path="/ajoutLt" element={<AjoutLieuxTouristiques/>}/>
          <Route path='/paiement' element={<Payement/>}/>

          <Route path="/protected" element={<ProtectedRoute/>}>
            <Route path="profil" element={<Profil/>}/>
            <Route path="admin" element={<AdminDashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
