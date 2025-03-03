import React, { useState } from 'react';
import axios from 'axios';
import style from "../styles/AjoutFormation.module.css"

const AjoutFormation = () => {
    const userName = localStorage.getItem('userName');
    const [titreInput, setTitreInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [prixInput, setPrixInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [typeInput, setTypeInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titre', titreInput);
        formData.append('description', descriptionInput);
        formData.append('prix', prixInput);
        formData.append('file', imageInput);
        formData.append('type', typeInput);
        formData.append('userName', userName);

        try {
            const response = await axios.post("http://localhost:5000/addAnnonces/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    return (
        <div>
            <h1>Ajouter une annonce</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titre">Titre de l'annonce:</label>
                <input type="text" id='titre' required value={titreInput} onChange={(e) => setTitreInput(e.target.value)} />
                <br />

                <label htmlFor="file">Ajoutez une image:</label>
                <input type="file" name='file' id='file' required onChange={(e) => setImageInput(e.target.files[0])} />
                <br />

                <label htmlFor="prix">Prix:</label>
                <input type="number" id='prix' required value={prixInput} onChange={(e) => setPrixInput(e.target.value)} />
                <br />

                <label htmlFor="type">Type d'annonce :</label>
                <select id="type" required value={typeInput} onChange={(e) => setTypeInput(e.target.value)}>
                    <option value="" disabled> Sélectionnez </option>
                    <option value="appartement">Appartement</option>
                    <option value="véhicule">Véhicule</option>
                </select>
                <br />

                <textarea name="description" id="" cols="30" rows="10" placeholder='Description' required value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></textarea>
                <br />
                <button type='submit'>Ajoutez</button>
            </form>
        </div>
    );
};

export default AjoutFormation;
