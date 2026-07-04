const express = require('express');
const path = require('path');
const starshipsRouter = require('./routes/starships');
const starshipService = require('./services/starshipService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/starships.json');
starshipService.init(DATA_FILE_PATH);

const publicPath = path.join(__dirname, '../public');

app.use(express.json());

app.use(express.static(publicPath));

app.use('/api/starships', starshipsRouter);

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Космический маршрут API не найден' });
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Ошибка на сервере:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера телеметрии' });
});

app.listen(PORT, () => {
    console.log(
        `Fullstack-приложение SpaceX успешно запущено!\nАдрес: http://localhost:${PORT}`);
});
