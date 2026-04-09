const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (name) => {
    const starships = fileService.readData(dataFilePath);
    if (name) {
        return starships.filter(ship =>
            ship.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    return starships;
};

const findOne = (id) => {
    const starships = fileService.readData(dataFilePath);
    return starships.find(ship => ship.id === id);
};

const create = (shipData) => {
    const starships = fileService.readData(dataFilePath);

    const newId = starships.length > 0
        ? Math.max(...starships.map(s => s.id)) + 1
        : 1;

    const newStarship = { id: newId, ...shipData };
    starships.push(newStarship);
    fileService.writeData(dataFilePath, starships);

    return newStarship;
};

const update = (id, shipData) => {
    const starships = fileService.readData(dataFilePath);
    const index = starships.findIndex(s => s.id === id);

    if (index === -1) return null;

    starships[index] = { ...starships[index], ...shipData };
    fileService.writeData(dataFilePath, starships);

    return starships[index];
};

const remove = (id) => {
    const starships = fileService.readData(dataFilePath);
    const filtered = starships.filter(s => s.id !== id);

    if (filtered.length === starships.length) return false;

    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
