import React, { useState, useEffect } from 'react';
import style from '../styles/Accueil.module.css'
import styles from '../Layout/MenuLayout.module.css';
import logo from '../Assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import profil from '../Assets/profil2.jpg'
import axios from "axios";

const Formation = () => {
  const [annonces, setAnnonces] = useState([]);
  const [lieuxTouristiques, setLieuxTouristiques] = useState([]);

  const userName = localStorage.getItem('userName');
  const token = localStorage.getItem('token');
  const handleReservation = (annonce) => {
    navigate("/paiement", { state: { reservationId: annonce.id, montant: annonce.prix / 2 } });
  };
    const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:5000/addAnnonces/getAnnonces") // Changement du lien pour récupérer toutes les formations
      .then((response) => {
        setAnnonces(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/addAnnonces/getLieuxTouristiques") // Changement du lien pour récupérer toutes les formations
      .then((response) => {
        setLieuxTouristiques(response.data.slice(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>

      <div>
        
      <header className= {styles.header} >
        <section className= {styles.logo} >
          {<img src= {logo} alt="" /> }
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
          </ul>
        </menu>

        <section className= {styles.section2} >
          <h2 className={style.userName}>{userName}</h2>
        </section>
        <article className={style.photo_profil}>
        <NavLink to={"/dashboard"} id={style.profil}><img src={profil} alt="profil" /></NavLink>
        </article>
        
      </header>


        <h1>Vous avez acces a une panoplie d'annonces n'hesitez pas.</h1>
      <section className={style.Formation}>
        {annonces.map((annonce, index) => (
          <section className={style.formation_box} key={index}>
            <article className={style.formation_box_img}>
              <img src={annonce.photo} id={style.img} alt="Annonce" />
            </article>
            <aside className={style.formation_box_text}>
              <h3>{annonce.titre}</h3>
              <p><strong>Type de bien:</strong> {annonce.type}</p>
              <p><strong>Prix:</strong> {annonce.prix}</p>
              <p><strong>Date de publication:</strong> {annonce.date}</p>
              <p><strong>Description:</strong> {annonce.description}</p>
            </aside>
            <article id={style.btn}>
            <button onClick={() => handleReservation(annonce.id)}>Réserver</button>
            </article>
          </section>
        ))}
      </section>

            <section className={style.Formation}>
        {lieuxTouristiques.map((lieu, index) => (
          <section className={style.formation_box} key={index}>
            <article className={style.formation_box_img}>
              <img src={lieu.photo} id={style.img} alt="Lieu Touristique" />
            </article>
            <aside className={style.formation_box_text}>
              <h3>{lieu.nom}</h3>
              <strong><a href= {lieu.localisation}> Cliquez "ici" pour plus d'informations</a></strong>
              <p><strong>Date de publication:</strong> {lieu.date}</p>
              <p><strong>Description:</strong> {lieu.description}</p>
            </aside>
            <article id={style.btn}>
            <button onClick={() => handleReservation(lieu.id)}>Réserver</button>
            </article>
          </section>
        ))}
      </section>
      
      </div>
    </>
  );
}


export default Formation;