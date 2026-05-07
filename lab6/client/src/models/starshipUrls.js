class StarshipUrls {
    constructor() {
        // Базовый URL вашего бэкенда (Лаб №4)
        this.baseUrl = 'http://localhost:3000/api';
    }

    // Получение списка кораблей (с поддержкой поиска)
    getStarships(name = '') {
        if (name) {
            return `${this.baseUrl}/starships?name=${encodeURIComponent(name)}`;
        }
        return `${this.baseUrl}/starships`;
    }

    // Получение одного корабля
    getStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }

    // Создание корабля
    createStarship() {
        return `${this.baseUrl}/starships`;
    }

    // Обновление корабля
    updateStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }

    // Удаление корабля
    deleteStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }
}

export const starshipUrls = new StarshipUrls();
