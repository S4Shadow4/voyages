import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import style from "../styles/Inscription.module.css"
const Inscription = () => {
    let [nomInput, setNomInput]= useState("");
    let [mdpInput,setMdpInput]= useState("");
    let [emailInput,setEmailInput]= useState("");
    let [typeInput,setTypeInput]= useState("");
  
    let navigate= useNavigate();
  return (
    <div>
       <h1>Inscription</h1>
        <form onSubmit={(e)=>{
            e.preventDefault();
            let user={nom:nomInput,mdp:mdpInput,email:emailInput, type:typeInput};
            console.log(user);
            axios
            .post("http://localhost:5000/user/signup", user)
            .then((res)=>{
              console.log(res.data);
              localStorage.setItem("userFullName", `${nomInput} ${emailInput}`);
              navigate("/login", { state: { message: "Inscription réussie. Vous pouvez maintenant vous connecter." } });
            })
            .catch((error)=>{
              console.log (error.response);
            })
             
        }}
        >

            <label htmlFor="nom">Nom:</label>
            <input type="text" id='nom' required onInput={(e)=>{setNomInput(e.target.value)}} />
            <br />

            <label htmlFor="mdp">Mot de passe</label>
            <input type="password" id='mdp' autoComplete='off' required onInput={(e)=>{setMdpInput(e.target.value)}} />
            <br />

            <label htmlFor="email"> Email </label>
            <input type="email" id='email' required onInput={(e)=>{setEmailInput(e.target.value)}} />
            <br />
            <label htmlFor="type">Type de compte</label>
              <select id="type" required onChange={(e) => { setTypeInput(e.target.value) }}>
                
              <option value="" disabled selected>Selectionnez</option>
                <option value="touriste">Touriste</option>
                <option value="propriétaire">Propriétaire</option>
              </select>
              <br />
            <button type='submit'>S'inscrire</button>
        </form>
    </div>
  )
}

export default Inscription;
