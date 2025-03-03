const dataBase = require("../Config/mysql");

exports.addLieuxTouristiques = (req, res) => {
  const { userName, nom, description, localisation} = req.body;

  //Rechercher l'utilisateur pour obtenir son ID
  const selectUserQuery = 'SELECT id FROM users WHERE nom = ?';
  
  dataBase.query(selectUserQuery, [userName], (error, result) => {
    if (error) {
      console.error("Erreur de recherche d'utilisateur:", error);
      return res.status(500).json({ error: "Erreur serveur lors de la recherche d'utilisateur." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const userId = result[0].id;
    
    //Insérer l'annonce avec le proprietaireId récupéré
    const insertFormationQuery = 'INSERT INTO `lieux_touristiques` (nom, description, localisation, photo, proprietaireId) VALUES(?,?,?,?,?)';
    dataBase.query(
      insertFormationQuery,
      [
        nom,
        description,
        localisation,
        `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
        userId // Utiliser l'ID de l'utilisateur comme proprietaireId
      ],
      (error, result) => {
        if (error) {
          console.error("Erreur lors de l'insertion de l'annonce:", error);
          return res.status(500).json({ error: "Erreur serveur lors de l'insertion de l'annonce." });
        }

        res.status(201).json({ message: 'Annonce enregistrée avec succès.' });
      }
    );
  });
};

exports.addAnnonces = (req, res) => {
  const { userName, titre, description, prix, type } = req.body;

  // Rechercher l'utilisateur pour obtenir son ID
  const selectUserQuery = 'SELECT id FROM users WHERE nom = ?';
  
  dataBase.query(selectUserQuery, [userName], (error, result) => {
    if (error) {
      console.error("Erreur de recherche d'utilisateur:", error);
      return res.status(500).json({ error: "Erreur serveur lors de la recherche d'utilisateur." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const userId = result[0].id;
    
    // Insérer l'annonce avec le proprietaireId récupéré
    const insertFormationQuery = 'INSERT INTO `annonces` (titre, description, prix, photo, type, proprietaireId) VALUES(?,?,?,?,?,?)';
    dataBase.query(
      insertFormationQuery,
      [
        titre,
        description,
        prix,
        `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
        type,
        userId // Utiliser l'ID de l'utilisateur comme proprietaireId
      ],
      (error, result) => {
        if (error) {
          console.error("Erreur lors de l'insertion de l'annonce:", error);
          return res.status(500).json({ error: "Erreur serveur lors de l'insertion de l'annonce." });
        }

        res.status(201).json({ message: 'Annonce enregistrée avec succès.' });
      }
    );
  });
};


exports.getAnnonces = (req, res) => {
  let selectAnnoncesQuery = "SELECT  id, titre, description, photo, type,prix, DATE_FORMAT(date_creation, '%Y-%m-%d') AS date FROM annonces";

  dataBase.query(selectAnnoncesQuery, (error, informations) => {
    if (error) {
      console.error('Error fetching formations:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(informations);
  });
};

exports.getLieuxTouristiques = (req, res) => {
  let selectLieuxTouristiquesQuery = "SELECT  id, nom, description, localisation, photo, DATE_FORMAT(date_creation, '%Y-%m-%d') AS date FROM lieux_touristiques";

  dataBase.query(selectLieuxTouristiquesQuery, (error, informations) => {
    if (error) {
      console.error('Error fetching formations:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(informations);
  });
};

