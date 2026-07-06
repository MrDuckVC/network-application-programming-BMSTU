import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { starshipUrls } from "../../modules/starshipUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentData = [];
    }

    getStarshipImage(id) {
        const images = {
            1: "mars",
            2: "leading_launch_service",
            3: "revolutionizing_space_tech",
            4: "advancing_human_spaceflight"
        };
        const imgName = images[id] || images[(id % 4) + 1];
        return {
            large: `src/img/${imgName}_large.jpg`,
            small: `src/img/${imgName}.jpg`
        };
    }

    getHTML() {
        return `
            <div id="spacex-carousel" class="carousel slide flex-grow-1 w-100" data-bs-touch="true">
                <div class="carousel-indicators z-3 mb-4" id="carousel-indicators-container"></div>
                <div class="carousel-inner position-absolute top-0 start-0 w-100 h-100" id="carousel-inner-container">
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <div class="spinner-border text-light" role="status"></div>
                    </div>
                </div>
                <button class="carousel-control-prev z-3" type="button" data-bs-target="#spacex-carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next z-3" type="button" data-bs-target="#spacex-carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </button>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        const headerControls = document.getElementById('header-controls');
        if (headerControls) {
            headerControls.innerHTML = '';
        }

        this.getData();
    }

    async getData() {
        const innerContainer = document.getElementById('carousel-inner-container');

        try {
            const data = await ajax.get(starshipUrls.getStarships());

            this.currentData = data;
            this.renderCarouselItems();

        } catch (error) {
            console.error("Ошибка при получении данных:", error);

            innerContainer.innerHTML = `
                <div class="d-flex flex-column justify-content-center align-items-center h-100 position-relative z-3">
                    <h4 class="text-warning text-uppercase">Ошибка загрузки телеметрии</h4>
                    <p class="text-secondary small">Проверьте соединение с сервером localhost:3000</p>
                    <button class="btn btn-outline-warning btn-sm mt-2" onclick="location.reload()">Повторить</button>
                </div>
            `;
        }
    }

    renderCarouselItems() {
        const innerContainer = document.getElementById('carousel-inner-container');
        const indicatorsContainer = document.getElementById('carousel-indicators-container');

        innerContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        this.currentData.forEach((item, index) => {
            indicatorsContainer.insertAdjacentHTML('beforeend', `
                <button type="button" data-bs-target="#spacex-carousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></button>
            `);

            const productCard = new ProductCardComponent(innerContainer);
            const shipImgs = this.getStarshipImage(item.id);

            const mappedData = {
                id: item.id,
                spacexTitle: item.name,
                spacexText: `Поколение: ${item.generation} | Статус: ${item.status}`,
                carouselSrc: shipImgs.large,
                src: shipImgs.small,
                taskTitle: `Телеметрия #${item.id}`,
                taskDesc: "Диагностика систем корабля."
            };

            productCard.render(mappedData, index, () => this.clickCard(item.id));
        });
    }

    clickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }
}
