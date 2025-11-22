const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

// API endpoint to fetch data.json
app.get('/api/data', (req, res) => {
    const file = path.join(__dirname, 'data.json'); // FIXED PATH

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to read data' });
        }

        try {
            const json = JSON.parse(data);
            return res.json(json);
        } catch (e) {
            return res.status(500).json({ error: 'Invalid JSON' });
        }
    });
});

// Home page
app.get('/', (req, res) => {
    const file = path.join(__dirname, 'data.json'); // FIXED PATH

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to load data');
        }

        const json = JSON.parse(data);
        res.render('index', { data: json });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
