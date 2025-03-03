-- Supprimer les tables si elles existent déjà
DROP TABLE IF EXISTS paiements, reservations, annonces, lieux_touristiques, users, user_roles, roles;
DROP TABLE annonces;
-- Table: users (avec roles en JSON)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    motDePasse VARCHAR(255) NOT NULL,
    roles JSON NOT NULL -- Stocke les rôles sous forme de tableau JSON
);

DROP TABLE annonces;
-- Table: annonces
CREATE TABLE annonces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    photo VARCHAR(255),
    type ENUM('véhicule', 'appartement') NOT NULL,
    proprietaireId INT NOT NULL,
    date_creation DATETIME DEFAULT NOW(),
    FOREIGN KEY (proprietaireId) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: reservations
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    utilisateurId INT NOT NULL,
    annonceId INT NOT NULL,
    FOREIGN KEY (utilisateurId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (annonceId) REFERENCES annonces(id) ON DELETE CASCADE
);
-- Table: lieux_touristiques
CREATE TABLE lieux_touristiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    localisation VARCHAR(100) NOT NULL,
    photo VARCHAR(255),
    proprietaireId INT NOT NULL,
    date_creation DATETIME DEFAULT NOW(),
    FOREIGN KEY (proprietaireId) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: paiements
CREATE TABLE paiements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservationId INT NOT NULL,
    montant DECIMAL(10, 2) NOT NULL,
    datePaiement DATE NOT NULL,
    tranche ENUM('première', 'deuxième', 'troisième') NOT NULL,
    FOREIGN KEY (reservationId) REFERENCES reservations(id) ON DELETE CASCADE
);

-- Insérer des paiements
INSERT INTO paiements (reservationId, montant, datePaiement, tranche) VALUES 
(1, 500.00, '2025-02-01', 'première'),
(1, 500.00, '2025-02-15', 'deuxième'),
(2, 300.00, '2025-02-05', 'première');

INSERT INTO users (id, nom, email, motDePasse, roles) VALUES
(1, 'cyrille', 'cyrille@gmail.com', '$2b$10$Qm1Ere3c.YKJR0COc2E9tuwhzCmu6be4Pju7h./5/mzb53oi.4lvG', '["touriste", "propriétaire"]'),
(2, 'yann', 'yannagbehonou@gmail.com', '$2b$10$kVeVBGAN9Xy6/oz7cNxXLePIxKFaxzpFfUEX2icc0dn3.bKdOydGe', '["propriétaire", "touriste"]');


INSERT INTO annonces (id, titre, description, prix, photo, type, proprietaireId, date_creation) VALUES
(1, 'AeroGlide', 'Moto ultra-légère conçue pour la vitesse et l\’agilité maximale.', 463344.00, 'http://localhost:5000/files/vehicule4.jpg_1741033082731.jpeg', 'véhicule', 2, '2025-03-03 20:18:02'),
(2, 'TitanX', 'Berline haut de gamme avec intérieur luxueux et technologie avancée.', 463388.00, 'http://localhost:5000/files/vehicule3.jpg_1741033114425.jpeg', 'véhicule', 2, '2025-03-03 20:18:34'),
(3, 'Émeraude Résidence', 'appartement lumineux avec balcon offrant une vue panoramique sur ville', 461388.00, 'http://localhost:5000/files/logement1.jpg_1741033187432.jpeg', 'appartement', 2, '2025-03-03 20:19:47'),
(4, 'Villa Solstice', 'Maison moderne avec grandes baies vitrées et jardin arboré paisible.', 21388.00, 'http://localhost:5000/files/logement2.jpg_1741033227621.jpeg', 'appartement', 2, '2025-03-03 20:20:27'),
(5, 'Horizon Loft', 'Loft industriel spacieux avec décoration minimaliste et hauts plafonds élégants.', 221388.00, 'http://localhost:5000/files/logement3.jpg_1741033255886.jpeg', 'appartement', 2, '2025-03-03 20:20:55'),
(6, 'Chalet Boréal', 'Chalet chaleureux en bois idéal pour séjours hivernaux en montagne.', 651388.00, 'http://localhost:5000/files/logement5.jpg_1741033304569.jpeg', 'appartement', 2, '2025-03-03 20:21:44');

SELECT id, nom, description, localisation, photo, proprietaireId, date_creation 
FROM lieux_touristiques;

INSERT INTO lieux_touristiques (id, nom, description, localisation, photo, proprietaireId, date_creation) VALUES
(1, 'Cristal Lagoon', 'Plage paradisiaque aux eaux turquoise et sable fin éclatant.', 'https://maps.app.goo.gl/2F4DPZmhiLP3m23v6', 'http://localhost:5000/files/lieu1.jpg_1741034108951.jpeg', 2, '2025-03-03 20:35:08'),
(2, 'Mont des Étoiles', 'Sommet majestueux offrant une vue panoramique sur les montagnes.', 'https://maps.app.goo.gl/jf4QKtSRNk34osjU6', 'http://localhost:5000/files/lieu2.jpg_1741034145188.jpeg', 2, '2025-03-03 20:35:45'),
(3, 'Oasis d’Émeraude', 'Oasis luxuriante avec palmiers et cascades rafraîchissantes naturelles.', 'https://maps.app.goo.gl/LdiJL8pXhUDE2KqQ7', 'http://localhost:5000/files/lieu3.jpg_1741034202499.jpeg', 2, '2025-03-03 20:36:42'),
(4, 'Falaises du Dragon', 'Falaises spectaculaires sculptées par le vent et l’océan déchaîné.', 'https://maps.app.goo.gl/YiB1XXrhhJDsHu4W9', 'http://localhost:5000/files/lieu6.jpg_1741034403200.jpeg', 2, '2025-03-03 20:40:03'),
(5, 'Jardin des Merveilles', 'Parc botanique enchanteur avec fleurs exotiques et fontaines féériques.', 'https://maps.app.goo.gl/YiB1XXrhhJDsHu4W9', 'http://localhost:5000/files/lieu7.jpg_1741034451916.jpeg', 2, '2025-03-03 20:40:51');


-- Ajouter un rôle à un utilisateur
UPDATE users
SET roles = JSON_ARRAY_APPEND(roles, '$', 'touriste')
WHERE nom = 'yann';

-- Supprimer un rôle d'un utilisateur
UPDATE users
SET roles = JSON_REMOVE(roles, JSON_UNQUOTE(JSON_SEARCH(roles, 'one', 'propriétaire')))
WHERE nom = 'yann' AND JSON_CONTAINS(roles, '"propriétaire"');