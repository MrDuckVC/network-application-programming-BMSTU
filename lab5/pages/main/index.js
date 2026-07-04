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
        const images = { 1: "mars", 2: "leading_launch_service", 3: "revolutionizing_space_tech", 4: "advancing_human_spaceflight" };
        const imgName = images[id] || images[(id % 4) + 1];
        return { large: `img/${imgName}_large.jpg`, small: `img/${imgName}.jpg` };
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

    getData() {
        const innerContainer = document.getElementById('carousel-inner-container');

        ajax.get(starshipUrls.getStarships(), (data, status) => {
            console.log("Статус ответа (Main):", status);
            if (status === 200 && data) {
                this.currentData = data;
                this.renderCarouselItems();
            } else {
                innerContainer.innerHTML = `
                <div class="d-flex flex-column justify-content-center align-items-center h-100 position-relative z-3">
                    <h4 class="text-warning text-uppercase">Система заблокирована CORS</h4>
                    <p class="text-secondary small">Статус: ${status}. Включите CORS Unblock и проверьте 127.0.0.1:3000</p>
                </div>
            `;
            }
        });
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
