# Mon Projet (Node.js API + React Frontend)

Ce projet est une application web utilisant **node.js** pour le backend et **React.js** pour le frontend.  
Il est organisé en deux dossiers :
- `backend/` : Contient l'API Node.js.
- `frontend/` : Contient l'application React.

## 🚀 Installation et Exécution

### 1️⃣ Backend (Node.js API)

#### 📌 Prérequis
Avant d'exécuter le backend, assure-toi d'avoir installé :
- Node.js
- Avoir wampserver d'installer et créer une base de données avec le nom: **voyages**
- MySQL (ou SQLite/PostgreSQL)
- Node.js (si utilisation de Webpack)

#### ⚙️ Installation
1. Aller dans le dossier `backend`.
2. Installer les dépendances avec npm install.
3. Exécuter les migrations et insérer les données initiales avec le script contenu dans **voyages.sql**.
5. S'assurer d'insérer toutes les données surtout dans les tables *users*, *annonces*, *lieux_touristiques* Vous pour insérer d'autres données et utilisateurs par la suite sur le front-end mais ces données sont les données tests de l'application.
6. Démarrer le serveur node.js avec la commande **nodemon**.

L'API sera accessible sur `http://127.0.0.1:5000`.

---

### 2️⃣ Frontend (React App)

#### 📌 Prérequis
Avant d'exécuter le frontend, assure-toi d'avoir installé :
- Node.js (>= 18.x)
- npm ou yarn

#### ⚙️ Installation
1. Aller dans le dossier `frontend`.
2. Installer les dépendances avec npm install.
3. Lancer le serveur en mode développement avec npm start.

L'application sera accessible à `http://localhost:3000`.

---

## 🔗 API et Configuration CORS

Si le frontend et le backend sont hébergés sur des domaines ou ports différents, il est nécessaire d'activer **CORS** dans Node.js pour permettre la communication entre les deux.

---

## 🎯 Déploiement

### 🚀 Backend (Node.js)
Il faut s'assurer que la base de données est bien configurée et exécuter les migrations en production si vous voulez mettre le backend en ligne.
Des controllers ont été gérer au niveau du backend et permet l'inscription et l'authentification des utilisateurs avec un cumul possible de rôles.
- Une possibilité de faire un payement fonctionnel en tant que touriste avec une configuration stripe mis en place. Je peux de mon côté accéder au payement fait depuis mon dashboard en mode développeur de stripe.
- Une possibilité d'ajouter des annonces et des lieux-touristiques avec des images en tant que propriétaires qui seront vu au niveau de plus d'annonces mais les annonces sur cette page ont été limité à 5 dans le fichier Formations.jsx et sont directement insérér dans la base de données.
- Une possibilité de voir les annonces faites et les lieux-touristiques ajoutés depuis l'interface administrateur en tant que propriétaire en cliquant sur voir annonces et voir lieux_touristiques.

---
### 🚀 Frontend (React)
Le frontend peut être hébergé sur des plateformes comme Vercel, Netlify ou un serveur Nginx. Avant le déploiement, il faut générer une version optimisée de l'application.

Pour un exemple de fonctionnement de l'application nous vous conseillons d'utiliser un utilisateur **yann** qui a le mot de passe **1234** que vous avez déjà créer avec voyages.sql et qui dispose du statut touriste comment propriétaire avec lui vous pourrez accéder à accueil.jsx premièrement ou si vous essayez de faire une réservation vous serez directement redirigé vers la page d'inscription où vous pouvez vous connecter par la suite en cliquant sur connexion avec l'utilisateur **yann** qui a les accès **1234** en tant que mot de passe et **yann** en tant que username vous sélectionnez la propriété **propriétaire** et vous accéderez aux **dashboard** où vous pourrez faire **des ajouts de lieu touristiques** et des **ajouts d'annonce** ainsi que voir **vos annonces** et **les lieux touristiques** ajouter en choisissant l'utilisateur yann en tant que touriste vous aurez accès à l'interface profil qui vous permettra de **cliquer sur le logo de profil** et d'avoir **un dashboard** en tant que touriste pour pouvoir voir vos différentes réservations et sur la page profil touriste vous pourrez utiliser l'option réservée pour faire un paiement réel fonctionnel avec lequel je pourrais voir des paiements effectués depuis mon dashboard de stripe en mode développeur en cliquant aussi sur plus d'annonces vous pourrez voir toutes les annonces qui ont été 
enregistrées.
- Pour tester le paiement: nous vous conseillons d'utiliser ces données:
    numéro de compte: 4242 4242 4242 4242 
    MM/AA : 12/26
    Code postal : 12345
    Mais vous pouvez aussi utiliser des données qui respectent les normes banquaires. 
---
- 

## 📌 Auteurs
- **Ton Nom** – Développeur Fullstack  
- 📧 Contact : yannagbehonou@gmail.com  
