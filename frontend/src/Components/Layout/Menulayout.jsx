import React from "react"
import style from "./MenuLayout.module.css"
import logo from "../Assets/logo.png"
import { NavLink } from "react-router-dom";
import {Outlet} from "react-router-dom"

const MenuLayout=()=>{
    return(
        <div>
          <header className= {style.header} >
        <section className= {style.logo} >
          {<img src= {logo} alt="" /> }
          <h1 id={style.h1}>Air+</h1>
        </section>
        <menu>
          <ul>
            <li>
              <NavLink to={"/"}>Accueil</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>Formations</NavLink>
            </li>
            <li>
              <a href="#ancre1">A propos</a>
            </li>
            <li>
              <a href="#ancre2">Contacts</a>
            </li>
          </ul>
        </menu>

        <section className= {style.section2} >
          <NavLink to={"/signup"} > <button className={style.button}>Inscription</button> </NavLink>
          <NavLink to={"/login"} > <button className={style.button} >Connexion</button> </NavLink> 
        </section>
        
      </header>
      <Outlet />
        </div>
         
      

    )

}
export default MenuLayout;