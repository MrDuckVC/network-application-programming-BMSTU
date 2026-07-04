class Ajax {
    // GET запрос
    async get(url) {
        try {
            const response = await fetch(url);
            // fetch не кидает ошибку при 404 или 500, проверяем вручную
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("GET error:", error);
            throw error;
        }
    }

    // POST запрос
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("POST error:", error);
            throw error;
        }
    }

    // PATCH запрос (для нашей формы редактирования)
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`Ошибка PATCH: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("PATCH error:", error);
            throw error;
        }
    }
}

export const ajax = new Ajax();
