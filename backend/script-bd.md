-- Active: 1711636334933@@127.0.0.1@3306@inscription_formation

CREATE TABLE users (
    id_user INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur_user VARCHAR(200) NOT NULL,
    nom_user VARCHAR(200) NOT NULL,
    prenom_user VARCHAR(200) NOT NULL,
    age_user INT(5) NOT NULL,
    mot_de_passe_user VARCHAR(255) NOT NULL,
    contact_user VARCHAR(200) NOT NULL,
    email_user VARCHAR(200) NOT NULL,
    sexe_user CHAR(1) NOT NULL,
    CONSTRAINT unique_email_user UNIQUE(email_user),
    CONSTRAINT unique_name UNIQUE(nom_user,prenom_user)
) ENGINE = InnoDB;

CREATE TABLE gerant (
    id_gerant INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur_gerant VARCHAR(200) NOT NULL,
    nom_gerant VARCHAR(200) NOT NULL,
    prenom_gerant VARCHAR(200) NOT NULL,
    age_gerant INT(5) NOT NULL,
    mot_de_passe_gerant VARCHAR(255) NOT NULL,
    contact_gerant VARCHAR(200) NOT NULL,
    email_gerant VARCHAR(200) NOT NULL,
    sexe_gerant CHAR(1) NOT NULL,
    CONSTRAINT unique_email_gerant UNIQUE(email_gerant),
    CONSTRAINT unique_name UNIQUE(nom_gerant,prenom_gerant)
) ENGINE = InnoDB;

CREATE TABLE formation(
    id_formation INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_gerant INT UNSIGNED DEFAULT 1,
    titre_formation VARCHAR(200) UNIQUE NOT NULL,
    image_formation VARCHAR(200) NOT NULL,
    debut_formation DATETIME NOT NULL,
    fin_formation DATE NOT NULL,
    description_formation TEXT NOT NULL,
    date_ajout_formation DATE NOT NULL,
    CONSTRAINT fk_gerant FOREIGN KEY (id_gerant) REFERENCES gerant (id_gerant)
) ENGINE = INNODB;

CREATE TABLE inscription(
    id_inscription INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_user INT UNSIGNED,
    id_formation INT UNSIGNED,
    date_inscription DATETIME DEFAULT now(),
    CONSTRAINT fk_users FOREIGN KEY (id_user) REFERENCES users (id_user),
    CONSTRAINT fk_formation FOREIGN KEY (id_formation) REFERENCES formation(id_formation)
) ENGINE = INNODB;
