# Base de Données & Modèle de Données

Le projet utilise **PostgreSQL** avec l'extension **PostGIS** pour gérer les données géospatiales. L'ORM utilisé est **Prisma**.

## 🗺️ PostGIS et Geospatial

Pour permettre une recherche rapide des pharmacies autour de la position d'un utilisateur, nous utilisons le type `geometry(Point, 4326)` de PostGIS.

Dans le schéma Prisma (`schema.prisma`), ce champ est défini comme :
```prisma
location Unsupported("geometry(Point, 4326)")?
```

Comme Prisma ne supporte pas nativement toutes les fonctions PostGIS, les recherches géospatiales sont effectuées via des requêtes SQL brutes (`$queryRaw`) :

```sql
SELECT id, name, ST_Distance(location, ...) as distance
FROM "Pharmacy"
WHERE ST_DWithin(location, ..., radius)
ORDER BY distance ASC
```

## 🗂️ Modèles de Données

Le schéma est composé des modèles principaux suivants :

### 1. Pharmacy
Représente une officine pharmaceutique.
- `id`, `name`, `address`, `phone`
- `latitude`, `longitude` : Coordonnées stockées en Float pour un accès facile.
- `location` : Champ PostGIS pour les calculs de proximité.
- `is24h` : Indique si la pharmacie est ouverte 24h/24 en permanence.
- `isOnDuty` : Indique si la pharmacie est actuellement de garde.

### 2. Schedule (Horaires)
Définit les heures d'ouverture normales d'une pharmacie.
- `dayOfWeek` : 0 (Dimanche) à 6 (Samedi).
- `openTime`, `closeTime` : Format HH:mm.

### 3. Report (Signalements)
Permet aux utilisateurs de signaler des problèmes.
- `type` : Ex: "incorrect_hours", "out_of_stock", "closed".
- `comment` : Détails supplémentaires.

### 4. User
Gestion des comptes pour l'accès administratif.
- `role` : "user", "pharmacist", "admin".
- `pharmacyId` : Optionnel, lie un pharmacien à son officine.

## ⚙️ Commandes Utiles

Les commandes Prisma doivent être exécutées depuis la racine (via les scripts pnpm) ou dans le dossier `packages/database`.

- `pnpm db:generate` : Génère le client Prisma.
- `pnpm db:push` : Synchronise le schéma avec la base de données.
- `pnpm db:seed` : (Si disponible) Remplit la base de données avec des données de test.
