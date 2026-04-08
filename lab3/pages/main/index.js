import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { spaceXData } from "../../models/data.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentData = [...spaceXData];
    }

    getHTML() {
        const indicatorsHTML = this.currentData.map((item, index) => `
            <button type="button" data-bs-target="#spacex-carousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
        `).join('');

        return `
            <div id="spacex-carousel" class="carousel slide flex-grow-1 w-100" data-bs-touch="true">

                <div class="carousel-indicators z-3 mb-4">
                    ${indicatorsHTML}
                </div>

                <div class="carousel-inner position-absolute top-0 start-0 w-100 h-100" id="carousel-inner-container">
                    </div>

                <button class="carousel-control-prev z-3" type="button" data-bs-target="#spacex-carousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next z-3" type="button" data-bs-target="#spacex-carousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>

            </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.renderCards(this.currentData);
    }

    renderCards(dataArray) {
        const container = document.getElementById('carousel-inner-container');
        container.innerHTML = '';

        dataArray.forEach((item, index) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(
                item,
                index,
                () => this.clickCard(item.id)
            );
        });
    }

    clickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }
}
