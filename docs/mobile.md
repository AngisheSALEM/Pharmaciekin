# Application Mobile (Citizen App)

L'application mobile est destinée aux citoyens de Kinshasa pour trouver rapidement une pharmacie.

## 📱 Technologies

- **Framework** : Expo (React Native) avec le système de routage `expo-router`.
- **Cartographie** : `@rnmapbox/maps` pour l'intégration de Mapbox.
- **Gestion des données** : `@tanstack/react-query` pour le fetching, le cache et la synchronisation.
- **Icônes** : `lucide-react-native`.

## 🗺️ Intégration de la Carte

L'écran principal utilise un composant `Map` qui affiche la position de l'utilisateur et les pharmacies environnantes sous forme de marqueurs.
Les marqueurs changent de couleur selon le statut de la pharmacie (ex: Vert pour ouvert/de garde, Gris pour fermé).

## 🔄 Gestion d'État avec React Query

Nous utilisons React Query pour :
- Mettre en cache les résultats de recherche.
- Gérer les états de chargement (`isLoading`) et d'erreur.
- Gérer les mutations (soumission de signalements) avec des mises à jour optimistes si nécessaire.

Exemple d'utilisation :
```typescript
const { data: pharmacies } = useQuery({
  queryKey: ['pharmacies', lat, lng],
  queryFn: () => fetchPharmacies(lat, lng)
});
```

## 🔌 Configuration

L'application utilise des variables d'environnement préfixées par `EXPO_PUBLIC_` :
- `EXPO_PUBLIC_API_URL` : URL du backend (ex: `http://localhost:3000` ou l'adresse IP de votre machine en développement).
- `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` : Votre jeton d'accès Mapbox.

## 🏃 Développement

Pour lancer l'application en développement :
```bash
cd apps/mobile
pnpm start
```
Utilisez l'application **Expo Go** sur votre téléphone pour scanner le code QR ou lancez un émulateur.
