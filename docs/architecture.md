# Architecture du Projet Pharma-Kin

Cette documentation explique l'organisation technique et les choix architecturaux du projet.

## 🏢 Structure Monorepo

Le projet utilise un **monorepo** géré par `pnpm workspaces`. Cette approche permet de partager du code (notamment le schéma de base de données) entre les différentes applications tout en gardant une séparation claire des responsabilités.

### Organisation des dossiers

- **`apps/mobile`** : Application mobile grand public développée avec React Native et Expo. Elle consomme l'API fournie par l'application web.
- **`apps/web`** : Application Next.js servant à la fois de tableau de bord pour les administrateurs/pharmaciens et de backend (API) pour l'application mobile.
- **`packages/database`** : Contient la définition de la base de données (Prisma) partagée entre les applications.

## 🔄 Flux de Données

1. **Base de données** : PostgreSQL avec PostGIS est la source de vérité.
2. **Backend (API)** : Next.js (App Router) expose des points de terminaison API REST sous `/api/...`.
3. **Clients** :
   - L'application **Web** utilise les Server Components de Next.js pour l'affichage direct et des API routes pour les interactions client-side.
   - L'application **Mobile** interroge l'API du backend via `fetch` et gère l'état et le cache avec **TanStack Query**.

## 🛠️ Partage de Code

Le partage du client Prisma est centralisé dans `packages/database`.
Chaque application importe le client généré pour interagir avec la même base de données, garantissant une cohérence parfaite des types TypeScript sur l'ensemble du projet.

## 🌐 Déploiement

- Le backend et le dashboard web sont conçus pour être déployés sur des plateformes comme **Vercel** ou des serveurs Node.js traditionnels.
- L'application mobile est compilée via **EAS (Expo Application Services)** pour iOS et Android.
- La base de données doit être un PostgreSQL supportant l'extension PostGIS.
