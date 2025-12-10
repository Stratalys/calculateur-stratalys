# 🚀 Guide d'utilisation de Live Server

## ✅ Installation terminée !

Live Server est maintenant installé dans votre projet. Voici comment l'utiliser :

## 📋 Méthodes pour lancer le serveur

### Méthode 1 : Via npm (Recommandé)
```bash
npm run serve
```
Cela lance Live Server sur le port 3000 et ouvre automatiquement votre navigateur.

### Méthode 2 : Via Vite (Hot Reload - Meilleur pour le développement)
```bash
npm run dev
```
Vite offre un rechargement automatique à chaque modification de fichier.

### Méthode 3 : Extension VS Code Live Server

1. **Installer l'extension** :
   - Ouvrez VS Code
   - Allez dans Extensions (⌘+Shift+X sur Mac, Ctrl+Shift+X sur Windows)
   - Recherchez "Live Server" par Ritwick Dey
   - Cliquez sur "Install"

2. **Utiliser l'extension** :
   - Clic droit sur `index.html` dans l'explorateur de fichiers
   - Sélectionnez "Open with Live Server"
   - Ou utilisez le bouton "Go Live" en bas à droite de VS Code

## 🎯 Quelle méthode choisir ?

- **`npm run dev`** (Vite) : Pour le développement React avec hot reload
- **`npm run serve`** (Live Server) : Pour servir des fichiers statiques simples
- **Extension VS Code** : Pour un démarrage rapide depuis l'éditeur

## 📝 Commandes disponibles

```bash
# Développement avec Vite (recommandé pour React)
npm run dev

# Live Server
npm run serve

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## 🌐 URLs

- **Vite** : http://localhost:3000
- **Live Server** : http://localhost:3000

## ⚠️ Note importante

Pour un projet React comme celui-ci, **Vite (`npm run dev`)** est recommandé car il :
- Supporte le hot module replacement (HMR)
- Compile TypeScript automatiquement
- Gère les imports de modules
- Optimise les performances

Live Server est utile pour des fichiers HTML statiques simples, mais pour React, Vite est l'outil adapté.
