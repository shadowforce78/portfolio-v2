# Guide de contribution

## 🎯 Structure du code

### CSS
- Utilisation de variables CSS pour une cohérence des couleurs
- Organisation modulaire (reset, composants, responsive)
- Support des thèmes via `data-theme` et `prefers-color-scheme`

### JavaScript
- Architecture orientée classe (`Portfolio`)
- Méthodes modulaires pour chaque fonctionnalité
- Gestion des événements centralisée
- Support localStorage pour les préférences

### HTML
- Sémantique moderne (HTML5)
- Accessibilité (ARIA, alt texts, focus management)
- Meta tags optimisées pour SEO et réseaux sociaux

## 🔧 Conventions de code

### CSS
```css
/* Variables en --kebab-case */
--primary-color: #8b25eb;

/* Classes en kebab-case */
.project-card { }

/* Media queries mobile-first */
@media (max-width: 768px) { }
```

### JavaScript
```javascript
// CamelCase pour les méthodes
setupEventListeners() { }

// Constants en UPPER_CASE
const API_ENDPOINT = '/api/projects';

// Classes en PascalCase
class Portfolio { }
```

## 🎨 Ajout de nouveaux thèmes

1. Ajouter les variables dans `style.css`
2. Créer un sélecteur `[data-theme="nom-theme"]`
3. Mettre à jour la logique JavaScript dans `toggleTheme()`

## 📱 Responsive Design

Points de rupture utilisés :
- Mobile : < 768px
- Tablet : 768px - 1024px  
- Desktop : > 1024px

## 🔍 Tests

- Tester sur différents navigateurs
- Vérifier l'accessibilité (lecteurs d'écran)
- Valider le responsive design
- Tester les performances (Core Web Vitals)

## 🚀 Déploiement

Le portfolio est prêt pour :
- Vercel (recommandé)
- Netlify
- Serveurs traditionnels avec Node.js
