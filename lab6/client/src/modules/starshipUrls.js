class StarshipUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
    }

    // Получение всех кораблей (с опциональным поиском по имени)
    getStarships(name = '') {
        if (name) {
            return `${this.baseUrl}/starships?name=${encodeURIComponent(name)}`;
        }
        return `${this.baseUrl}/starships`;
    }

    // Получение конкретного корабля по ID
    getStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }

    // Создание нового корабля
    createStarship() {
        return `${this.baseUrl}/starships`;
    }

    // Обновление корабля (PATCH)
    updateStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }

    // Удаление корабля
    deleteStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }
}

export const starshipUrls = new StarshipUrls();
