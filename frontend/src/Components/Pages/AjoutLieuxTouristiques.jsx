import React, { useState } from 'react';
import axios from 'axios';
import style from "../styles/AjoutFormation.module.css"

const AjoutLieuxTouristiques = () => {
    const userName = localStorage.getItem('userName');
    const [titreInput, setTitreInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [localisationInput, setLocalisationInput] = useState("");
    const [imageInput, setImageInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', titreInput);
        formData.append('description', descriptionInput);
        formData.append('localisation', localisationInput);
        formData.append('file', imageInput);
        formData.append('userName', userName);

        try {
            const response = await axios.post("http://localhost:5000/addAnnonces/add", formData, {
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
            <h1>Ajouter un lieu touristique</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="titre">Nom:</label>
                <input type="text" id='titre' required value={titreInput} onChange={(e) => setTitreInput(e.target.value)} />
                <br />

                <label htmlFor="file">Ajoutez une image:</label>
                <input type="file" name='file' id='file' required onChange={(e) => setImageInput(e.target.files[0])} />
                <br />

                <label htmlFor="localisation">Localisation (google maps):</label>
                <input type="url" id='localisation' required value={localisationInput} onChange={(e) => setLocalisationInput(e.target.value)} />
                <br />

                <textarea name="description" id="" cols="30" rows="10" placeholder='Description' required value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></textarea>
                <br />
                <button type='submit'>Ajoutez</button>
            </form>
        </div>
    );
};

export default AjoutLieuxTouristiques;
