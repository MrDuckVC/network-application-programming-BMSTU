const express = require('express');
const path = require('path');
const starshipsRouter = require('./routes/starships');
const starshipService = require('./services/starshipService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/starships.json');
starshipService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/starships', starshipsRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Космический маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера телеметрии' });
});

app.listen(PORT, () => {
    console.log(`Сервер SpaceX Operations API запущен на http://localhost:${PORT}`);
});
