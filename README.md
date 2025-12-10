# Calculateur Stratalys

Simulateur de croissance marketing avec calculs de ROI clairs et design responsive.

## 🚀 Installation

1. Installer les dépendances :
```bash
npm install
```

## 📦 Utilisation

### Développement avec Vite (Hot Reload)
```bash
npm run dev
```
Ouvre automatiquement sur http://localhost:3000

## 🛠️ Scripts disponibles

- `npm run dev` - Lance le serveur de développement Vite
- `npm run build` - Build de production
- `npm run preview` - Prévisualise le build de production

## 📁 Structure

```
calculateur Stratalys/
├── client/src/
│   ├── components/     # Composants React
│   ├── pages/          # Pages
│   └── App.tsx         # Point d'entrée React
├── shared/             # Schémas partagés
└── index.html          # HTML principal
```

## 🎨 Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form + Zod
- EmailJS

## 📤 Pousser sur GitHub

### Méthode rapide (script)
```bash
./push-to-github.sh VOTRE_USERNAME NOM_DU_REPO
```

### Méthode manuelle

1. **Créer le repository sur GitHub** : https://github.com/new
2. **Lier et pousser** :
```bash
git remote add origin https://github.com/VOTRE_USERNAME/NOM_DU_REPO.git
git branch -M main
git push -u origin main
```

📖 Voir `.github/PUSH_INSTRUCTIONS.md` pour plus de détails.
