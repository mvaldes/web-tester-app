![CI](https://github.com/<ton-utilisateur>/web-tester-app/actions/workflows/tests.yml/badge.svg)

# Web Tester App

Une application complète pour tester automatiquement un site web — côté **frontend** (Lighthouse, accessibilité) et **backend** (API REST).

---

## 🚀 Fonctionnalités

- ✅ **Tests de performance** (Lighthouse)
- ✅ **Tests d’accessibilité** (axe-core + Puppeteer)
- ✅ **Tests API dynamiques** (Supertest + Jest)
- ✅ **Rapports HTML et JSON**
- ✅ **Dashboard local** via Express
- ✅ **Email automatique** avec résumé des résultats
- ✅ **Compatible Docker et CI GitHub Actions**

---

## 🛠 Installation

```bash
npm install
```

> Utilise aussi `./install.sh` si tu veux automatiser l’installation (optionnel)

---

## ▶️ Lancement

```bash
npm start
```

Cela :
- Lance les tests
- Génère les rapports
- Envoie un email de résumé
- Démarre un serveur local : [http://localhost:3000](http://localhost:3000)

---

## 🧪 Commandes utiles

```bash
npm run test           # Lance tous les tests
npm run serve          # Lance le dashboard local
npm run test:frontend  # Lighthouse + accessibilité
npm run test:backend   # Tests API
```

---

## 📂 Structure

```
web-tester-app/
├── config/               # URLs à tester
├── dashboard/            # HTML du tableau de bord
├── reports/              # Résultats générés
├── services/             # Email + exécutions
├── tests/                # Scripts frontend/backend
├── run-all.js            # Orchestrateur principal
├── server.js             # Serveur local
└── package.json
```

---

## ⚠️ Remplacer dans le code :
- `tonemail@gmail.com` → ton adresse
- `motdepasse_application` → mot de passe d’application Gmail
- `destinataire@email.com` → l’email de réception
- `<ton-utilisateur>` → ton nom GitHub dans le badge ci-dessus

---

## 🌐 Déploiement GitHub

```bash
gh auth login
gh repo create web-tester-app --public --source=. --remote=origin --push
```

---

> Généré avec ❤️ par [Mauro] — entièrement personnalisable et open source.
