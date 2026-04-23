# Pharma-Kin 🏥🇨🇩

Pharma-Kin est une plateforme complète conçue pour aider les habitants de Kinshasa à localiser facilement les pharmacies de garde et les services pharmaceutiques de proximité.

Ce projet est structuré comme un monorepo utilisant `pnpm` et comprend une application mobile pour les citoyens, un tableau de bord web pour les pharmaciens et les administrateurs, ainsi qu'une base de données géospatiale partagée.

## 🚀 Fonctionnalités principales

- **Localisation Géospatiale** : Recherche de pharmacies à l'aide de PostGIS pour des calculs de distance précis.
- **Pharmacies de Garde** : Mise à jour en temps réel des pharmacies actuellement en service (24h/24 ou de garde).
- **Signalement Communautaire** : Possibilité pour les utilisateurs de signaler des horaires incorrects ou des ruptures de stock.
- **Tableau de Bord Administrateur** : Interface web pour la gestion des pharmacies, des horaires et des rapports.
- **Application Mobile** : Expérience fluide avec cartes interactives (Mapbox) et support hors-ligne (React Query).

## 🏗️ Structure du Projet

```text
.
├── apps/
│   ├── mobile/       # Application React Native (Expo)
│   └── web/          # Tableau de bord Administrateur (Next.js)
├── packages/
│   └── database/     # Schéma Prisma et client partagé
├── docs/             # Documentation technique approfondie (Nouveau !)
├── package.json      # Configuration du monorepo
└── pnpm-workspace.yaml
```

## 🛠️ Stack Technique

- **Frontend Web** : Next.js 15, Tailwind CSS, Shadcn/UI, NextAuth.js.
- **Mobile** : React Native (Expo), Mapbox, TanStack Query (React Query).
- **Base de données** : PostgreSQL avec l'extension **PostGIS**.
- **ORM** : Prisma.
- **Langage** : TypeScript.

## 🏁 Démarrage Rapide

### Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)
- [PostgreSQL](https://www.postgresql.org/) avec l'extension **PostGIS** installée.

### Installation

1. Clonez le dépôt :
   ```bash
   git clone <repository-url>
   cd pharma-kin
   ```

2. Installez les dépendances :
   ```bash
   pnpm install
   ```

3. Configurez l'environnement :
   Copiez le fichier `.env.example` à la racine et dans les dossiers `apps/web/` et `apps/mobile/` (si nécessaire) et remplissez les variables requises (DATABASE_URL, NEXTAUTH_SECRET, etc.).

4. Initialisez la base de données :
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

5. Lancez le développement :
   ```bash
   pnpm dev
   ```

## 📚 Documentation Approfondie

Pour comprendre le fonctionnement interne du projet, consultez les guides suivants dans le dossier `/docs` :

- [Architecture Global](./docs/architecture.md)
- [Modèle de Données & PostGIS](./docs/database.md)
- [API Endpoints](./docs/api.md)
- [Application Mobile](./docs/mobile.md)
- [Tableau de Bord Web](./docs/web.md)

---
*Développé pour améliorer l'accès aux soins de santé à Kinshasa.*
