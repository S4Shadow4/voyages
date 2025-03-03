import React, { useEffect, useState } from 'react';
import styles from '../Layout/MenuLayout.module.css';
import style from '../styles/Accueil.module.css';
import logo from '../Assets/logo.png';
import profil from '../Assets/profil2.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profil = () => {
  const [annonces, setAnnonces] = useState([]);
  const [lieuxTouristiques, setLieuxTouristiques] = useState([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  

  useEffect(() => {
    axios
      .get('http://localhost:5000/addAnnonces/getAnnonces', {
        headers: { authorization: `BEARER ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setAnnonces(response.data.slice(0, 4));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate('/login');
        } else {
          console.log(error);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/addAnnonces/getLieuxTouristiques', {
        headers: { authorization: `BEARER ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setLieuxTouristiques(response.data.slice(0, 4));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate('/login');
        } else {
          console.log(error);
        }
      });
  }, []);

  const handleReservation = (annonce) => {
    navigate("/paiement", { state: { reservationId: annonce.id, montant: annonce.prix / 2 } });
  };
  

  return (
    <div>
      <header className={styles.header}>
        <section className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1 id={styles.h1}>Air+</h1>
        </section>
        <menu>
          <ul>
            <li><NavLink to={"/protected/profil"}>Accueil</NavLink></li>
            <li><NavLink to={"/Formations"}>Formations</NavLink></li>
            <li><a href="#ancre1">A Propos</a></li>
            <li><a href="#ancre2">Contacts</a></li>
          </ul>
        </menu>
        <section className={styles.section2}>
          <h2 className={style.userName}>{userName}</h2>
        </section>
        <article className={style.photo_profil}>
          <NavLink to={"/dashboard"} id={style.profil}>
            <img src={profil} alt="profil" />
          </NavLink>
        </article>
      </header>

      <div className={style.presentation}>
        <section className={style.cadre}>
          <article id={style.articleIntro}>
            <h2 className={style.texteIntro}>Bienvenue dans le futur, "Air+" Votre Agence de voyages</h2>
          </article>
        </section>
      </div>

      <section className={style.Propos}>
        <h1 id='ancre1'>A Propos</h1>
        <p>
        Bienvenue chez Air+, votre partenaire idéal pour des escapades inoubliables.
        Nous sommes ravis de vous proposer une sélection de destinations de rêve, des forfaits personnalisés et des services de qualité pour répondre à toutes vos envies d'aventure. Explorez le monde avec nous et laissez-nous organiser votre prochain voyage !
        </p>
      </section>

      {/* Section Annonces */}
      <h1>Nos Annonces</h1>
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

      {/* Section Lieux Touristiques */}
      <h1>Nos Lieux Touristiques</h1>
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

      {/* Section Formations */}
      <h1>Toutes nos Propositions</h1>
      <section className={style.Formations}>
        <h1 id={style.Formations}>Profitez de toutes nos propositions</h1>
        <NavLink to={"/Formations"}>
          <button className={style.button}>Plus de Propositions</button>
        </NavLink>
      </section>

      {/* Footer */}
      <footer>
        <div className={style.logo} id='ancre2'>
          <NavLink to={"https://www.facebook.com/"} id={style.app}></NavLink>
          <NavLink to={"https://www.whatsapp.com/"} id={style.mes}></NavLink>
          <NavLink to={"https://www.instagram.com/"} id={style.wp}></NavLink>
          <NavLink to={"https://www.linkedin.com/login"} id={style.tw}></NavLink>
        </div>
        <p className={style.p}>copy right 2024 Yann AGB - Toute reproduction interdite</p>
      </footer>
    </div>
  );
};

export default Profil;
