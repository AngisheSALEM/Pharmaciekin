# Documentation de l'API

L'API de Pharma-Kin est exposée par l'application Next.js (`apps/web`) et est utilisée par l'application mobile.

## 📍 Recherche de Pharmacies

### `GET /api/pharmacies/search`

Recherche des pharmacies à proximité d'un point géographique.

**Paramètres de requête :**
- `lat` (Float) : Latitude du centre de recherche.
- `lng` (Float) : Longitude du centre de recherche.
- `radius` (Int, optionnel) : Rayon de recherche en mètres (défaut: 5000).

**Réponse :**
Un tableau d'objets `Pharmacy` incluant la distance calculée.

## 🏥 Détails d'une Pharmacie

### `GET /api/pharmacies/[id]`

Récupère les informations complètes d'une pharmacie, y compris ses horaires.

### `PATCH /api/pharmacies/[id]/status` (Protégé)

Permet à un pharmacien ou administrateur de changer le statut "De Garde" d'une pharmacie.

## 📢 Signalements (Reports)

### `POST /api/reports`

Permet de soumettre un signalement pour une pharmacie spécifique.

**Corps de la requête :**
```json
{
  "pharmacyId": "string",
  "type": "incorrect_hours" | "out_of_stock" | "closed" | "confirm_open",
  "comment": "string (optionnel)"
}
```

## 🔐 Authentification

L'authentification est gérée par **NextAuth.js**.
Les endpoints de l'API administrateur requièrent un cookie de session valide ou un token JWT selon la configuration.

- `POST /api/auth/signin` : Connexion.
- `POST /api/auth/signout` : Déconnexion.
