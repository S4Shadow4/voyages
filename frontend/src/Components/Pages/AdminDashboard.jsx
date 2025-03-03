import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../styles/Admin.module.css';
import logo from "../Assets/logo.png";
import axios from 'axios';

const AdminDashboard = () => {
    const [lieuxTouristiques, setLieuxTouristiques] = useState([]);
    const [annonces, setAnnonces] = useState([]);
    const [inscriptions, setInscriptions] = useState([]);
    const [showLieuxTouristiquesList, setShowLieuxTouristiquesList] = useState(false);
    const [showAnnoncesList, setShowAnnoncesList] = useState(false);
    const [showInscriptionList, setShowInscriptionList] = useState(false);

    useEffect(() => {
        // Récupération des utilisateurs / des annonces
        axios.get('http://localhost:5000/addAnnonces/getLieuxTouristiques')
            .then(response => {
                setLieuxTouristiques(response.data);
            })
            .catch(error => {
                console.error('Error fetching LieuxTouristiques:', error);
            });

        // Récupération des formations
        axios.get('http://localhost:5000/addAnnonces/getAnnonces')
            .then(response => {
                setAnnonces(response.data);
            })
            .catch(error => {
                console.error('Error fetching formations:', error);
            });

        // Récupération des inscriptions
        axios.get('http://localhost:5000/gerant/inscription')
            .then(response => {
                setInscriptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching inscriptions:', error);
            });
    }, []);

    const toggleLieuxTouristiquesList = () => {
        setShowLieuxTouristiquesList(!showLieuxTouristiquesList);
    };

    const toggleAnnoncesList = () => {
        setShowAnnoncesList(!showAnnoncesList);
    };

    const toggleInscriptionList = () => {
        setShowInscriptionList(!showInscriptionList);
    };

    return (
        <div className={style.container}>
            <aside>
                <div className={style.toggle}>
                    <div className={style.logo}>
                        <NavLink to="/admin"> <h2>Air+ </h2> </NavLink>
                    </div>
                    <div className={style.close} id="close-btn">
                        <span className="material-icons-sharp">close</span>
                    </div>
                </div>

                <div className={style.sidebar}>
                    <NavLink to="/ajoutFormation">
                        <i className="fas fa-chart-bar">Ajouter Annonces</i>
                    </NavLink>
                    <NavLink to="/ajoutLt">
                        <i className="fas fa-chart-bar">Ajouter Lieux touristique</i>
                    </NavLink>
                    <NavLink to="#" onClick={toggleLieuxTouristiquesList}>
                        <i className="fas fa-chart-bar">Voir Lieux Touristiques</i>
                    </NavLink>
                    <NavLink to="#" onClick={toggleAnnoncesList}>
                        <i className="fas fa-chart-bar">Voir les annonces</i>
                    </NavLink>
                    <NavLink to="#" onClick={toggleInscriptionList}>
                        <i className="fas fa-chart-bar">Voir Inscription</i>
                    </NavLink>
                    <NavLink to="/login">
                        <i className="fas fa-chart-bar">Se deconnecter</i>
                    </NavLink>
                </div>
            </aside>

            <main>
                <h1>Dashboard</h1> <br /> 

                <div className={style.analyse}>
                    

                </div>

                <div id="commandesContent">
                    
                <h2>Liste des Lieux Touristiques</h2>
                    <table id={style.utilisateurs}>
                        <thead>
                            <tr>
                                <th>Nom</th> <th>Description</th> <th>Localisation</th>  <th>Date</th>
                            </tr>
                        </thead>
                        <tbody id={style.list_user} style={{ display: showLieuxTouristiquesList ? 'table-row-group' : 'none' }}>
                        {lieuxTouristiques.map(lieuTouristique => (
                                <tr key={lieuTouristique.nom}>
                                    <td>{lieuTouristique.nom}</td>
                                    <td>{lieuTouristique.description}</td>
                                    <td>{lieuTouristique.localisation}</td>
                                    <td>{lieuTouristique.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> <br />

                    <h2>Liste des annonces</h2>
                <table id={style.formations}>
                    <thead>
                        <tr>
                            <th>titre</th> <th>description</th> <th>Prix</th> <th>photo</th> <th>type</th>  <th>date</th>
                        </tr>
                    </thead>
                    <tbody id={style.list_form} style={{ display: showAnnoncesList ? 'table-row-group' : 'none' }}>
                        {annonces.map(annonce => (
                            <tr key={annonce.titre}>
                                <td>{annonce.titre}</td>
                                <td>{annonce.description}</td>
                                <td>{annonce.prix}</td>
                                <td>{annonce.photo}</td>
                                <td>{annonce.type}</td>
                                <td>{annonce.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 

                <h2>Voir les réservations</h2>
                <table id={style.formations}>
                    <thead>
                        <tr>
                            <th>id_inscription</th> <th>id_user</th> <th>id_formation</th> <th>date_inscription</th> 
                        </tr>
                    </thead>
                    <tbody id={style.list_form} style={{ display: showInscriptionList ? 'table-row-group' : 'none' }}>
                        {inscriptions.map(inscription => (
                            <tr key={inscription.id_inscription}>
                                <td>{inscription.id_inscription}</td>
                                <td>{inscription.id_user}</td>
                                <td>{inscription.id_formation}</td>
                                <td>{inscription.date_inscription}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
                </div>

            </main>

            <div className={style['right-section']}>
                <div className={style['user-profile']}>
                    {<img src= {logo} alt="" /> }
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
