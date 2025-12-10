# 📤 Instructions pour pousser sur GitHub

## ✅ Étape 1 : Créer le repository sur GitHub

1. Allez sur https://github.com/new
2. Nommez votre repository (ex: `calculateur-stratalys`)
3. Ne cochez **PAS** "Initialize with README" (le repo est déjà initialisé)
4. Cliquez sur "Create repository"

## ✅ Étape 2 : Lier votre repo local à GitHub

Copiez-collez ces commandes dans votre terminal (remplacez `VOTRE_USERNAME` et `NOM_DU_REPO`) :

```bash
cd "/Users/Anthony/Desktop/calculateur Stratalys"

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/NOM_DU_REPO.git

# Renommer la branche principale en main (si nécessaire)
git branch -M main

# Pousser le code
git push -u origin main
```

## 🔐 Si vous utilisez l'authentification par token

Si GitHub vous demande un token :

1. Allez dans GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Créez un nouveau token avec les permissions `repo`
3. Utilisez le token comme mot de passe lors du push

## 🚀 Alternative : Via SSH

Si vous avez configuré SSH avec GitHub :

```bash
git remote add origin git@github.com:VOTRE_USERNAME/NOM_DU_REPO.git
git branch -M main
git push -u origin main
```

## 📝 Commandes Git utiles

```bash
# Voir l'état
git status

# Ajouter des fichiers modifiés
git add .

# Faire un commit
git commit -m "Votre message"

# Pousser les changements
git push

# Voir l'historique
git log --oneline
```
