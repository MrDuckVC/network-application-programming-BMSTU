import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

import { EditFormComponent } from "../../components/edit-form/index.js";

import { ajax } from "../../modules/ajax.js";
import { starshipUrls } from "../../modules/starshipUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page" class="container position-relative pb-5" style="max-width: 800px;"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getData() {
        this.pageRoot.innerHTML = `
            <div class="d-flex justify-content-center align-items-center mt-5 spinner-container">
                <div class="spinner-border text-light" role="status"></div>
            </div>
        `;

        ajax.get(starshipUrls.getStarshipById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                this.pageRoot.innerHTML = `
                    <div class="mt-4">
                        <button id="error-back-btn" class="btn btn-primary mb-3">Назад</button>
                        <h3 class="text-danger">Ошибка: Данные не найдены или сервер недоступен (CORS)</h3>
                    </div>
                `;
                document.getElementById('error-back-btn').addEventListener('click', () => this.clickBack());
            }
        });
    }

    renderData(item) {
        this.pageRoot.innerHTML = '';

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const mappedData = {
            id: item.id,
            spacexTitle: item.name,
            spacexText: `Поколение: ${item.generation} <br> Статус: ${item.status} <br> Ввод в эксплуатацию: ${item.commissionDate}`,
            src: "img/revolutionizing_space_tech.jpg" // Заглушка
        };
        const product = new ProductComponent(this.pageRoot);
        product.render(mappedData);

        const editForm = new EditFormComponent(this.pageRoot);
        editForm.render(item, this.saveChanges.bind(this));
    }

    saveChanges() {
        const updatedData = {
            name: document.getElementById('input-name').value,
            generation: document.getElementById('input-generation').value,
            status: document.getElementById('input-status').value,
            commissionDate: document.getElementById('input-date').value
        };

        const submitBtn = document.querySelector('#edit-starship-form button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Сохранение...";
        submitBtn.disabled = true;

        ajax.patch(starshipUrls.updateStarshipById(this.id), updatedData, (res, status) => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;

            if (status === 200) {
                this.getData();
            } else {
                alert(`Ошибка сохранения. Статус: ${status}. Проверьте CORS.`);
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.getData();
    }
}
