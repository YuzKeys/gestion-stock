# Exo WebAPI en Express

Réaliser une Web API Restfull qui permet la gestion de stock de produit.

$\scriptsize\color{gray}{\textsf{NB : Le client peut modifier la demande à tout moment !}}$

## Contraintes technique
- Utilisation du framework « Express JS » en version 5
- Interaction avec la DB via un ORM *(Sequelize, Mongoose, ...)*
- Langage JS, TS, Flow
- Les endpoints qui renvoient des listes doit : 
  - Avoir un mécanisme de pagination
  - Envoyé uniquement les données nécessaires

## Endpoints de l'API

### /api/product - Gestion des produits
- [ ] Obtenir la liste des produits
- [ ] Obtenir le détail d'un produit
- [ ] **(Admin/Manager)** Ajouter un produit
- [ ] **(Admin/Manager)** Modifier un produit
- [ ] Ajouter une image à un produit *(Tips : Multer)*

### /api/stock - Gestion des transactions dans le stock des produits
- [ ] Ajout ou retrait d'une quantité de produit dans le stock
- [ ] Obtenir la liste des transactions  
*Par default, on obtient de la plus récentes à la plus ancienne.*
- [ ] **(Admin/Manager)** Annuler une transaction  
*Il doit resté possible d'obtenir les transactions annulées.*
- [ ] **(Admin)** Corrigé la valeur d'un stock de produit  
*Ce endpoint sera utilisé, par exemple, lors des inventaires de l'entrepôt.*

### /api/member - Gestion des utilisateurs 
- [ ] **(Admin)** Créer des compte
- [ ] Permettre une connexion via un JWT
- [ ] Obtenir les informations d'un profil
- [ ] Mettre à jours les informations de son profil
- [ ] **(Admin)** Désactiver  un compte

## Les modèles de données

### Produit
- Un identifiant
- Un nom
- Une référence (EAN 13)
- Une description (Optionnel)
- Une catégorie
- La quantité de produit

### Transaction dans le stock
- Un identifiant
- Le produit concerné
- Le type de transaction (Entré ou sorti)
- La quantité
- Les info d'encodage (la date et le créateur)
- Le statut (Transaction annuler ?)

### Un utilisateur
- Un login (Unique et non modifiable)
- Une adresse email
- Le prénom et nom
- Son rôle *[Admin / Manager / Member]*
- La date de la dernière connexion
- Le statut (Compte désactivé ?)

## Régles métiers

### Création de compte
Un administrateur créer un compte utilisateur en renseignant les informations suivantes : 
- Un login (Unique)
- Son adresse email
- Son rôle *[Admin / Manager / Member]*

Par rapport à la création du mot de passe, deux possibilités : 


> $\small\color{green}{\textbf{Facile}}$  
> L'admin renseigne le mot de passe lors de la création du compte

> $\small\color{red}{\textbf{Difficile}}$  
> L'admin ne renseigne aucun mot de passe.  
> L'utilisateur reçoit un email qui lui permet de définir son mot de passe.  
> Il sera nécessaire de créer un endpoint adapté :wink:  
> *(Tips : Le logiciel [Smtp4Dev](https://github.com/rnwood/smtp4dev) vous permet d'héberger un faux serveur SMTP pour l'envoie de mail)*

Le mot de passe ne doit pas être stocker en "clair" dans la base de donnée.  
Celui-ci doit être haché, pour cela, vous pouvez utiliser : 
- [BCrypt](https://www.npmjs.com/package/bcrypt)
- [Argon2](https://www.npmjs.com/package/argon2)
- [La méthode "crypto.scrypt" de Node](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)

### Stock

**Retrait de produit du stock**  
La quantité de produit ne doit jamais tombé en négatif.  
Si une transaction devrait le faire, celle-ci doit être bloqué et envoyé une erreur à l'utilisateur.

**Notification (Bonus)**  
Quand la quantité de produit arrivé à moins de 10, suite à un retrait. Les managers reçoivent un mail d'alert.
