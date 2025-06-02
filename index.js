const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const port = 6969 || process.env.PORT;

// Middleware
app.use(express.json());

// Configuration pour servir les fichiers statiques avec de meilleurs headers
app.use(express.static('public', {
    maxAge: '1d', // Cache pendant 1 jour
    etag: true,
    lastModified: true
}));

// Route pour récupérer les projets
app.get('/api/projects', (req, res) => {
    try {
        const yamlContent = fs.readFileSync(path.join(__dirname, 'data', 'projects.yml'), 'utf8');
        const data = yaml.load(yamlContent);
        res.json(data.projects);
    } catch (error) {
        console.error('Erreur lors de la lecture des projets:', error);
        res.status(500).json({ error: 'Impossible de charger les projets' });
    }
});

// Route principale
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`🚀 Portfolio en cours d'exécution sur http://localhost:${port}`);
});