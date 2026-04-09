const express = require('express');
const path = require('path');
const starshipsRouter = require('./routes/starships');
const starshipService = require('./services/starshipService');

const app = express();
const PORT = 3000;

// Инициализация пути к базе данных
const DATA_FILE_PATH = path.join(__dirname, 'data/starships.json');
starshipService.init(DATA_FILE_PATH);

// Middleware для JSON
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Подключаем маршруты по тематике Услуг
app.use('/api/starships', starshipsRouter);

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Космический маршрут не найден' });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера телеметрии' });
});

app.listen(PORT, () => {
    console.log(`Сервер SpaceX Operations API запущен на http://localhost:${PORT}`);
});
