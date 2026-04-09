const starshipService = require('../services/starshipService');

const getAllStarships = (req, res) => {
    const { name } = req.query; // Извлекаем параметр поиска
    const starships = starshipService.findAll(name);
    res.json(starships);
};

const getStarshipById = (req, res) => {
    const id = parseInt(req.params.id);
    const starship = starshipService.findOne(id);

    if (!starship) {
        return res.status(404).json({ error: 'Космический корабль не найден' });
    }
    res.json(starship);
};

const createStarship = (req, res) => {
    const { name, generation, status, commissionDate } = req.body;

    if (!name || !generation || !status || !commissionDate) {
        return res.status(400).json({ error: 'Не все поля заполнены (name, generation, status, commissionDate)' });
    }

    const newStarship = starshipService.create({ name, generation, status, commissionDate });
    res.status(201).json(newStarship);
};

const updateStarship = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStarship = starshipService.update(id, req.body);

    if (!updatedStarship) {
        return res.status(404).json({ error: 'Космический корабль не найден' });
    }
    res.json(updatedStarship);
};

const deleteStarship = (req, res) => {
    const id = parseInt(req.params.id);
    const success = starshipService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Космический корабль не найден' });
    }
    res.status(204).send();
};

module.exports = {
    getAllStarships,
    getStarshipById,
    createStarship,
    updateStarship,
    deleteStarship
};
