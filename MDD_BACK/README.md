# MDD_BACK

## 📝 Description

**MDD_BACK** est un projet backend Java basé sur **Spring Boot**, développé pour **ORION**.  
Il gère les fonctionnalités serveur et utilise **MySQL** comme base de données relationnelle.

## ⚙️ Prérequis

Avant de lancer le projet, assurez-vous d’avoir les outils suivants installés sur votre machine :

- **Java** : version 17 ou supérieure
- **Maven** : pour la gestion des dépendances
- **MySQL** : avec un serveur opérationnel

## 🚀 Installation et Lancement
### Étapes pour installer les dépendances et démarrer l'application :

1. **Ouvrir un terminal** :

   Lancez un terminal (ou une invite de commande).

2. **Se déplacer dans le dossier du projet** :

   ```bash ou Terminal
   cd MDD_BACK
   ```

3. **Installer les dépendances Maven** :

   ```bash ou Terminal
   mvn clean install
   ```

4. **Configurer la base de données** :

    - Vérifiez que le serveur **MySQL** est bien démarré.
    - Assurez-vous que les paramètres de connexion sont correctement renseignés dans le fichier `application.properties`.

5. **Lancer l'application** :

   ```bash ou Terminal
   mvn spring-boot:run
   ```

## 📦 Dépendances

Ce projet utilise les dépendances principales suivantes :

- **Spring Boot Starter Web** : pour la gestion des requêtes HTTP
- **Spring Boot Starter WebSocket** : pour les communications WebSocket
- **Spring Boot Starter Data JPA** : pour l'accès aux données via JPA
- **Lombok** : pour réduire le code boilerplate avec des annotations
- **MySQL Connector Java** : pour la connexion à la base de données
- **SockJS Client** et **STOMP WebSocket** : pour améliorer les échanges WebSocket
- **SLF4J** : pour la gestion des logs

## 📚 Génération de la Javadoc

Le projet intègre un plugin Maven pour générer la documentation technique :

```bash ou Terminal
mvn javadoc:javadoc
```

La documentation sera générée à l'emplacement suivant :

```
/Users/OpenClassrooms/Soutenance/MESSIAEN_Elvis_Projet6_ORION_/Messiaen_ELvis_6_ORION_10_01_2025/Javadoc
```

## 🗂️ Structure du Projet

Voici une vue simplifiée de l’arborescence :

```
MDD_BACK/
├── src/
│   └── main/
│       ├── java/              # Code source Java principal
│       └── resources/         # Fichiers de configuration (application.properties, etc.)
├── pom.xml                    # Fichier de configuration Maven
```

## 👤 Auteur

**Elvis Messiaen**

