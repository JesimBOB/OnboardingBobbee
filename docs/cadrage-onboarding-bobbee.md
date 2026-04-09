# Onboarding BOBBEE – Cadrage Produit & Technique (V1 → V3)

## 🎯 Objectif

Créer un **mini service web d’onboarding BOBBEE**, hébergé sur AWS, destiné aux nouveaux entrants (dev, QA, PO, PM, managers…).

Objectifs principaux :

* Comprendre BOBBEE (histoire, mission)
* Se repérer dans l’organisation
* Installer son poste
* Accéder rapidement aux liens utiles

---

## 🧭 Vision Produit

### V1 (démo – J+1)

Un portail simple, visuel et fonctionnel :

* Page d’accueil unique
* Vidéo centrale d’introduction
* 4 tuiles principales :

  * **BOBBEE** → vidéo dédiée
  * **Organigramme** → Klaxoon (nouvel onglet)
  * **Installation du poste** → Confluence (nouvel onglet)
  * **Liens utiles** → page interne
* Page "Liens utiles" avec :

  * Recherche
  * Filtres simples
* Agent conversationnel (LLM) limité aux liens utiles
* Hébergement AWS (S3)

👉 Objectif : **démo visuelle propre, utile, crédible**

---

### V2 (site publiable)

* Écran d’administration intégré
* Gestion des contenus :

  * liens utiles
  * catégories
  * vidéos
  * textes
* Mise à jour sans passer par Git
* Suivi des évolutions documentaires
* Backend léger (ex: DynamoDB ou équivalent)
* Amélioration du chatbot

---

### V3 (expérience enrichie)

* Cartographie des compétences (fun & interactive)
* Parcours par rôle (dev, QA, PM…)
* Assistant avancé (texte + vocal)
* Recherche étendue (doc interne validée)
* Analytics d’usage

---

## 🧱 Architecture Technique

### Stack recommandée

* **Frontend** : Next.js + TypeScript
* **UI** : Tailwind CSS
* **Données (V1)** : JSON dans le repo
* **Hébergement** : AWS S3 (CloudFront ensuite)

### Pourquoi ce choix

* Rapide à développer
* Facile à maintenir
* Évolutif vers V2/V3
* Compatible intégration LLM

---

## 📁 Structure des données (Liens utiles)

Les liens (≈150) sont structurés en JSON :

```json
[
  {
    "id": "lien-001",
    "categorie": "Discovery et analyse",
    "type": "Documentation métier",
    "qui": "Tous",
    "quoi": "API V1 - Analyse Fonctionnelle",
    "url": "https://...",
    "source": "Atlassian"
  }
]
```

Utilisations :

* affichage
* filtres
* recherche
* alimentation du chatbot

---

## 🤖 Agent Conversationnel (V1)

### Périmètre

* Recherche uniquement dans les **liens utiles**
* Pas d’accès direct à Confluence
* Pas de RAG complexe

### Fonctionnement

* L’utilisateur pose une question
* Le système filtre les liens pertinents
* Le LLM reformule la réponse

### Résultat attendu

* 1 à 5 liens pertinents
* réponse simple et utile

👉 Objectif : **utile sans complexité technique excessive**

---

## 🎨 UX / UI

### Univers visuel

* Thème : **ruche / abeille / miel**
* Couleurs : beige, jaune doux, anthracite
* Style : chaleureux, moderne, accessible

### Home

* Vidéo centrale
* Image onboarding en haut à gauche
* Tuiles cliquables
* Message d’accueil

### Pages internes

* BOBBEE : vidéo + mission + histoire
* Liens utiles : recherche + filtres + cartes

---

## ⏱️ Plan d’exécution (8h)

### 1. Setup projet (1h)

* Init Next.js + Tailwind
* Structure dossiers

### 2. Home page (2h)

* Layout
* Vidéo
* Tuiles

### 3. Pages internes (1h30)

* Page BOBBEE
* Page Liens utiles

### 4. Données (1h30)

* Excel → JSON
* Recherche + filtres

### 5. Chatbot (1h30)

* Interface simple
* Appel LLM

### 6. Déploiement (30 min)

* Build
* Upload S3

---

## ⚠️ Périmètre volontairement exclu (V1)

* Authentification
* Base de données
* Admin avancé
* Voix
* Synchronisation Confluence
* Personnalisation utilisateur

👉 Priorité : **simplicité + stabilité + démonstration**

---

## 🚀 Positionnement de la démo

> "Un portail d’onboarding BOBBEE simple, chaleureux et centralisé, permettant de découvrir l’entreprise, accéder aux ressources clés et retrouver rapidement les bons outils grâce à un assistant intelligent."

---

## 📅 Prochaines étapes (dès lundi)

1. Amélioration UX/UI
2. Mise en place admin
3. Connexion données dynamiques
4. Enrichissement chatbot
5. Publication AWS complète
6. Cadrage V3 (compétences)

---

## ✅ Conclusion

* V1 = **démo solide et crédible**
* Architecture pensée pour évoluer
* Priorité à l’usage et à la clarté
* Complexité progressive (V2 / V3)

👉 Stratégie : *commencer simple, livrer vite, enrichir ensuite*
