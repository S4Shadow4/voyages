import React, { useState, useEffect } from 'react';
import style from "../styles/Accueil.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Accueil = () => {
    const [annonces, setAnnonces] = useState([]);
  const [lieuxTouristiques, setLieuxTouristiques] = useState([]);
  const navigate = useNavigate();
  const handleReservation = (annonce) => {
    navigate("/signup", { state: { reservationId: annonce.id, montant: annonce.prix / 2 } });
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/addAnnonces/getAnnonces')
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
      .get('http://localhost:5000/addAnnonces/getLieuxTouristiques',)
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

  return (
    <>
      <div className={style.presentation}>  
        <section className={style.cadre}>
          <article id={style.articleIntro}>
            <h2 className={style.texteIntro}>Bienvenue dans le futur, "Air+" Votre Agence de voyages </h2> 
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

        <h1>Toutes nos propositions</h1>
        <section className={style.Formations}>
          <h1 id={style.Formations}>Profitez de toutes nos propositions</h1>
          <NavLink to={"/signup"}><button className={style.button}>Plus de propositions</button></NavLink>
          
        </section>
        <footer >
          <div className={style.logo} id='ancre2'>
            <NavLink to={"https://www.facebook.com/"} id={style.app}></NavLink>
            <NavLink to={"https://www.whatsapp.com/"} id={style.mes}></NavLink>
            <NavLink to={"https://www.instagram.com/"} id={style.wp}></NavLink>
            <NavLink to={"https://www.linkedin.com/login"} id={style.tw}></NavLink>     
          </div>
          <p className={style.p}>copy right 2024 Yann AGB -Toute reproduction interdite</p>
        </footer> 
    </>
  );
}

export default Accueil;
