# Portfolio Adam Planque

Un portfolio moderne et responsive pour développeur fullstack, avec un système de gestion de projets via YAML.

## 🚀 Fonctionnalités

- **Design moderne et responsive** - Optimisé pour desktop et mobile
- **Gestion de projets via YAML** - Facile à maintenir et à mettre à jour
- **Animations fluides** - Expérience utilisateur engageante
- **Mode sombre/clair** - S'adapte aux préférences système
- **Performance optimisée** - Chargement rapide et SEO-friendly
- **Navigation intuitive** - Menu mobile et scroll smooth

## 🛠 Technologies utilisées

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Données**: YAML (js-yaml)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Responsive**: Mobile-first design

## 📁 Structure du projet

```
V2Html/
├── public/                 # Fichiers statiques
│   ├── css/
│   │   └── style.css      # Styles principaux
│   ├── js/
│   │   └── main.js        # Logique JavaScript
│   ├── images/            # Images des projets
│   └── index.html         # Page principale
├── data/
│   └── projects.yml       # Configuration des projets
├── .vscode/
│   └── tasks.json         # Tâches VS Code
├── index.js               # Serveur Express
├── package.json           # Dépendances npm
└── README.md              # Documentation
```

## 🚀 Installation et utilisation

1. **Cloner le projet** (si applicable)
   ```bash
   git clone [url-du-repo]
   cd V2Html
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## ✏️ Personnalisation

### Modifier les informations personnelles

Éditez le fichier `public/index.html` pour mettre à jour :
- Nom et titre
- Description personnelle
- Informations de contact
- Liens vers réseaux sociaux

### Ajouter/Modifier des projets

Éditez le fichier `data/projects.yml` avec la structure suivante :

```yaml
projects:
  - title: "Nom du projet"
    description: "Description détaillée du projet"
    technologies: ["React", "Node.js", "MongoDB"]
    link: "https://github.com/username/project"
    demo: "https://project-demo.com"
    image: "/images/project-screenshot.jpg"
    featured: true  # Pour mettre en avant
```

### Personnaliser les couleurs

Dans `public/css/style.css`, modifiez les variables CSS :

```css
:root {
    --primary-color: #2563eb;     /* Couleur principale */
    --secondary-color: #1e40af;   /* Couleur secondaire */
    --accent-color: #3b82f6;      /* Couleur d'accent */
    /* ... autres variables */
}
```

### Ajouter des images de projets

1. Placez vos images dans `public/images/`
2. Référencez-les dans `projects.yml` avec le chemin `/images/nom-image.jpg`

## 📱 Responsive Design

Le portfolio est entièrement responsive avec :
- Navigation mobile avec menu hamburger
- Grille adaptative pour les projets
- Typographie fluide
- Images optimisées

## 🎨 Thème sombre/clair

Le site s'adapte automatiquement aux préférences système de l'utilisateur grâce aux media queries `prefers-color-scheme`.

## 🔧 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm start` - Lance le serveur en mode production

## 📦 API Endpoints

- `GET /` - Page principale
- `GET /api/projects` - Récupère la liste des projets au format JSON

## 🚀 Déploiement

### Vercel (recommandé)
1. Connectez votre repo GitHub à Vercel
2. La configuration se fait automatiquement

### Netlify
1. Uploadez le dossier `public/` sur Netlify
2. Configurez les redirections pour l'API si nécessaire

### Serveur traditionnel
1. Uploadez tous les fichiers sur votre serveur
2. Installez Node.js et les dépendances
3. Lancez avec `node index.js`

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter des fonctionnalités

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier.

## 📞 Contact

Adam Planque - [planque.adam@gmail.com](mailto:planque.adam@gmail.com)

---

Fait avec ❤️ et beaucoup de ☕
