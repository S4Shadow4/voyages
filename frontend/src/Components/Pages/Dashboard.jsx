import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../styles/Admin.module.css';
import styles from '../Layout/MenuLayout.module.css';
import style_Acc from '../styles/Accueil.module.css';
import logo from "../Assets/logo.png";
import axios from 'axios';
import profil from '../Assets/profil2.jpg';

const Dashboard = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [showInscriptionList, setShowInscriptionList] = useState(false);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    axios.get(`http://localhost:5000/user/select/${userName}`)
      .then(response => {
        setInscriptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching inscriptions:', error);
      });
  }, [userName]);
  

  const toggleInscriptionList = () => {
    setShowInscriptionList(!showInscriptionList);
  };

  return (
    <div>
      <header className={styles.header}>
        <section className={styles.logo}>
          <img src={logo} alt="" />
          <h1 id={styles.h1}>Air+</h1>
        </section>
        <menu>
          <ul>
            <li>
              <NavLink to={"/protected/profil"}>Accueil</NavLink>
            </li>
            <li>
              <NavLink to={"/Formations"}>Formations</NavLink>
            </li>
            <li>
              <NavLink to={"/A Propos"}>A Propos</NavLink>
            </li>
            <li>
              <NavLink to={"/Contacts"}>Contacts</NavLink>
            </li>
          </ul>
        </menu>

        <section className={styles.section2}>
          <h2 className={style_Acc.userName}>{userName}</h2>
        </section>
        <article className={style_Acc.photo_profil} id={style.photos}>
          <NavLink to={"/dashboard"} id={style_Acc.profil}><img src={profil} alt="profil" /></NavLink>
        </article>
      </header>

      <div className={style.container}>

        <aside>
          <div className={style.toggle}>
            <div className={style.logo}>
            </div>
            <div className={style.close} id="close-btn">
              <span className="material-icons-sharp">close</span>
            </div>
          </div>

          <div className={style.sidebar}>
            <NavLink to="#" onClick={toggleInscriptionList}>
              <i className="fas fa-chart-bar">Voir les réservations</i>
            </NavLink>
            <NavLink to="/login">
              <i className="fas fa-chart-bar">Se deconnecter</i>
            </NavLink>
          </div>
        </aside>

        <main>

          <div className={style.analyse}>

          </div>

          <div id="commandesContent">

            <h2>Liste des inscriptions</h2>
            <table id={style.utilisateurs}>
              <thead>
                <tr>
                  <th>Titre </th> <th></th> <th>description</th> <th>date</th> <th>Photo</th> <th>Type</th> <th>ProprietaireId</th>
                </tr>
              </thead>
            </table> <br />
          </div>

        </main>

        <div className={style['right-section']}>
          <div className={style['user-profile']}>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
