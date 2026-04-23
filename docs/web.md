# Tableau de Bord Web & Backend

L'application Web (`apps/web`) sert à la fois d'interface administrative et de serveur API.

## 💻 Technologies

- **Framework** : Next.js 15 (App Router).
- **Style** : Tailwind CSS avec des composants de **Shadcn/UI**.
- **Authentification** : NextAuth.js.
- **ORM** : Prisma Client.

## 🔐 Authentification & Rôles

L'accès à l'administration est protégé par un middleware.
- **Admin** : Peut gérer toutes les pharmacies, les utilisateurs et voir tous les signalements.
- **Pharmacien** : Peut mettre à jour les informations (garde, horaires) de sa propre pharmacie.

## 🛠️ Fonctionnalités Administratives

1. **Gestion des Pharmacies** : Liste, ajout, modification et suppression des officines.
2. **Statut de Garde** : Activation/désactivation rapide du statut de garde.
3. **Suivi des Signalements** : Visualisation des rapports envoyés par les utilisateurs mobiles pour corriger les données.

## 🔌 API Routes

Toutes les routes API se trouvent dans `src/app/api/`. Elles utilisent le client Prisma partagé pour interagir avec la base de données PostgreSQL.

## 🏃 Développement

Pour lancer le dashboard en développement :
```bash
cd apps/web
pnpm dev
```
L'interface sera accessible sur `http://localhost:3000`.

## 📦 Build

Pour compiler l'application :
```bash
pnpm build
```
Next.js générera une version optimisée pour la production dans le dossier `.next`.
