const dataBase= require("../Config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { nom, email, mdp, type } = req.body;
  const roles = Array.isArray(type) ? type : [type]; // Convertir en tableau si ce n'est pas déjà un tableau

  bcrypt.hash(mdp, 10)
      .then((hash) => {
          // Vérifier si l'utilisateur existe déjà
          const checkUserQuery = "SELECT id, roles FROM users WHERE email = ?";
          dataBase.query(checkUserQuery, [email], (error, results) => {
              if (error) {
                  console.error("Erreur SQL lors de la vérification de l'utilisateur :", error);
                  return res.status(500).json({ error: "Erreur lors de l'inscription." });
              }

              if (results.length > 0) {
                  // L'utilisateur existe déjà, mettre à jour ses rôles
                  const userId = results[0].id;
                  let existingRoles = JSON.parse(results[0].roles);

                  // Ajout uniquement des rôles qui ne sont pas déjà présents
                  const updatedRoles = [...new Set([...existingRoles, ...roles])];

                  const updateRolesQuery = "UPDATE users SET roles = ? WHERE id = ?";
                  dataBase.query(updateRolesQuery, [JSON.stringify(updatedRoles), userId], (updateError) => {
                      if (updateError) {
                          console.error("Erreur lors de la mise à jour des rôles :", updateError);
                          return res.status(500).json({ error: "Erreur lors de l'ajout du rôle." });
                      }
                      return res.status(200).json({ message: "Rôle ajouté avec succès", userId, updatedRoles });
                  });
              } else {
                  // Nouvel utilisateur, insertion dans la base de données
                  const insertUserQuery = "INSERT INTO users (nom, email, motDePasse, roles) VALUES (?, ?, ?, ?)";
                  dataBase.query(insertUserQuery, [nom, email, hash, JSON.stringify(roles)], (insertError, result) => {
                      if (insertError) {
                          console.error("Erreur lors de l'insertion de l'utilisateur :", insertError);
                          return res.status(500).json({ error: "Erreur lors de l'inscription." });
                      }
                      return res.status(201).json({ message: "Utilisateur inscrit avec succès", userId: result.insertId, roles });
                  });
              }
          });
      })
      .catch((error) => {
          console.error("Erreur lors du hash du mot de passe :", error);
          res.status(500).json({ error: "Erreur serveur." });
      });
};



exports.login = (req, res) => {
  console.log("Requête reçue:", req.body);

  const { userName, mdp, type } = req.body;

  if (!userName || !mdp || !type) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const selectUserQuery = "SELECT id, nom, motDePasse, roles FROM users WHERE nom = ?";
  
  dataBase.query(selectUserQuery, [userName], async (error, result) => {
      if (error) {
          console.error("Erreur SQL:", error);
          return res.status(500).json({ error: "Erreur serveur." });
      }

      if (result.length === 0) {
          return res.status(401).json({ error: "Utilisateur non trouvé." });
      }

      const user = result[0];
      console.log("Utilisateur trouvé:", user);

      // Vérification de la colonne roles
      if (!user.roles) {
          return res.status(500).json({ error: "Données utilisateur invalides (rôles manquants)." });
      }


      let userRoles;
      try {
          userRoles = typeof user.roles === "string" ? JSON.parse(user.roles) : user.roles;
          
          if (!Array.isArray(userRoles)) {
              console.error("Format des rôles invalide:", userRoles);
              return res.status(500).json({ error: "Erreur de format des rôles." });
          }
      } catch (parseError) {
          console.error("Erreur de parsing des rôles:", parseError);
          return res.status(500).json({ error: "Erreur de lecture des rôles." });
      }
      
      // Normalise la casse et vérifier si le rôle existe dans le tableau
      const normalizedRoles = userRoles.map(role => role.toLowerCase().trim());
      const requestedRole = type.toLowerCase().trim();
      
      console.log("Rôles stockés de l'utilisateur:", normalizedRoles);
      console.log("Rôle demandé par le front:", requestedRole);
      
      if (!normalizedRoles.includes(requestedRole)) {
          console.error("⚠ Type de compte incorrect:", requestedRole);
          return res.status(403).json({ error: "Type de compte incorrect." });
      }
      
      console.log("Connexion réussie");

      console.log("Rôles de l'utilisateur:", userRoles);
      console.log("Type attendu:", type);

      // Vérifier si le rôle de l'utilisateur contient le type demandé
      if (!userRoles.includes(type.trim().toLowerCase())) {
          console.error("⚠ Type de compte incorrect:", type);
          return res.status(403).json({ error: "Type de compte incorrect." });
      }

      console.log("Connexion réussie");

      // Vérification du mot de passe avec bcrypt
      console.log("Vérification du mot de passe...");
      try {
          const validPassword = await bcrypt.compare(mdp, user.motDePasse);
          if (!validPassword) {
              return res.status(401).json({ error: "Mot de passe incorrect." });
          }
      } catch (error) {
          console.error("Erreur de comparaison du mot de passe:", error);
          return res.status(500).json({ error: "Erreur serveur." });
      }

      // Vérification du rôle demandé
      if (!userRoles.includes(type)) {
          return res.status(403).json({ error: "Type de compte incorrect." });
      }

      // Définition du code de statut en fonction du type
      let statusCode = 200;
      if (type === "touriste") statusCode = 202;
      if (type === "propriétaire") statusCode = 203;

      // Génération du token JWT
      console.log("Génération du token...");
      const accessToken = jwt.sign(
          { user_id: user.id, roles: userRoles },
          process.env.JWT_SECRET || "bRODJI04#",
          { expiresIn: "10h" }
      );

      console.log("Connexion réussie !");
      res.status(statusCode).json({ accessToken, type });
  });
};