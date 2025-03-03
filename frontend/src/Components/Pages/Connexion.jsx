import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../styles/Connexion.module.css";

const Connexion = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [message, setMessage] = useState(location.state?.message || "");
    const [messageErr, setMessageErr] = useState("");
    const [userNameInput, setUserNameInput] = useState("");
    const [typeInput, setTypeInput] = useState("");
    const [mdpInput, setMdpInput] = useState("");

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageErr("");

        const user = { userName: userNameInput, mdp: mdpInput, type: typeInput };

        try {
            const res = await axios.post("http://localhost:5000/user/login", user);
            
            console.log("Réponse serveur:", res.data);
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("userName", userNameInput);
            localStorage.setItem("userType", res.data.type);

            if (res.status === 202) {
                navigate("/protected/profil");
            } else if (res.status === 203) {
                navigate("/protected/admin");
            } else {
                setMessageErr("Type de compte inconnu. Veuillez vérifier vos informations.");
            }
        } catch (error) {
            console.error("Erreur de connexion:", error);
            console.error("Réponse d'erreur:", error.response);

            if (error.response && error.response.status === 403) {
                setMessageErr("Le type de compte ne correspond pas.");
            } else {
                setMessageErr("Identifiants incorrects. Veuillez réessayer.");
            }
        }
    };

    return (
        <div className={style.container}>
            <h1>Connexion</h1>

            {message && <p className={style.successMessage}>{message}</p>}
            {messageErr && <p className={style.errorMessage}>{messageErr}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Nom d'utilisateur :</label>
                <input
                    type="text"
                    id="userName"
                    required
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                />
                <br />

                <label htmlFor="mdp">Mot de passe :</label>
                <input
                    type="password"
                    id="mdp"
                    required
                    autoComplete="off"
                    value={mdpInput}
                    onChange={(e) => setMdpInput(e.target.value)}
                />
                <br />

                <label htmlFor="type">Type de compte :</label>
                <select id="type" required value={typeInput} onChange={(e) => setTypeInput(e.target.value)}>
                    <option value="" disabled> Sélectionnez </option>
                    <option value="touriste">Touriste</option>
                    <option value="propriétaire">Propriétaire</option>
                </select>
                <br />

                <button type="submit">Connexion</button>
            </form>
        </div>
    );
};

export default Connexion;