#!/bin/bash

# Script pour pousser le projet sur GitHub
# Usage: ./push-to-github.sh VOTRE_USERNAME NOM_DU_REPO

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Usage: ./push-to-github.sh VOTRE_USERNAME NOM_DU_REPO"
    echo "   Exemple: ./push-to-github.sh anthony calculateur-stratalys"
    exit 1
fi

USERNAME=$1
REPO_NAME=$2

echo "🚀 Configuration du remote GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/$USERNAME/$REPO_NAME.git

echo "📦 Renommage de la branche en main..."
git branch -M main

echo "📤 Push vers GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Succès ! Votre code est sur GitHub :"
    echo "   https://github.com/$USERNAME/$REPO_NAME"
else
    echo "❌ Erreur lors du push. Assurez-vous que :"
    echo "   1. Le repository existe sur GitHub"
    echo "   2. Vous avez les permissions d'écriture"
    echo "   3. Vous êtes authentifié (token ou SSH)"
fi
