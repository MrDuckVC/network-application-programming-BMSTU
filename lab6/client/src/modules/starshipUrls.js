class StarshipUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api';
    }

    getStarships(name = '') {
        if (name) {
            return `${this.baseUrl}/starships?name=${encodeURIComponent(name)}`;
        }
        return `${this.baseUrl}/starships`;
    }

    getStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }

    createStarship() {
        return `${this.baseUrl}/starships`;
    }

    updateStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }

    deleteStarshipById(id) {
        return `${this.baseUrl}/starships/${id}`;
    }
}

export const starshipUrls = new StarshipUrls();
