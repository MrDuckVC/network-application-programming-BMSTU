export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data, index) {
        const activeClass = index === 0 ? "active" : "";

        return `
            <div class="carousel-item h-100 ${activeClass}">

                <img src="${data.carouselSrc}" class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-0" alt="SpaceX">

                <div class="container-fluid position-relative z-1 h-100 d-flex flex-column justify-content-end pb-5">

                    <div class="row w-100 mb-5">
                        <div class="col-10 offset-1 col-md-5 offset-md-1 col-lg-3 offset-lg-2 pe-auto">
                            <h2 class="text-white text-uppercase fw-bold mb-3">${data.spacexTitle}</h2>
                            <p class="text-light mb-4">${data.spacexText}</p>
                            <button class="btn btn-outline-light px-4 py-2 text-uppercase" id="click-card-${data.id}">Подробнее</button>
                        </div>
                    </div>

                    <div class="position-absolute top-0 mt-5 pe-auto" style="right: 15%; width: 320px; z-index: 10;">
                        <h6 class="text-secondary text-uppercase fw-bold mb-2 border-bottom border-secondary pb-2">${data.taskTitle}</h6>
                        <p class="small text-secondary mb-3">${data.taskDesc}</p>
                        <button class="btn btn-outline-secondary btn-sm w-100 mb-2 text-uppercase fw-bold" id="run-algo-${data.id}">Запустить алгоритм</button>
                        <div class="text-secondary small mt-2" id="algo-output-${data.id}" style="min-height: 20px;">Ожидание команды...</div>
                    </div>

                </div>
            </div>
        `;
    }

    render(data, index, clickListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data, index));

        document.getElementById(`click-card-${data.id}`).addEventListener("click", clickListener);

        document.getElementById(`run-algo-${data.id}`).addEventListener("click", () => {
            const output = document.getElementById(`algo-output-${data.id}`);

            switch (data.id) {
                case 1: {
                    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
                    let sum = 0;
                    for (let i = 0; i < matrix.length; i++) {
                        sum += matrix[i][i];
                        if (i !== matrix.length - 1 - i) {
                            sum += matrix[i][matrix.length - 1 - i];
                        }
                    }
                    output.innerHTML = `
                        Оригинал: <span class="text-secondary">${matrix.join(' | ')}</span><br>
                        Сумма диагоналей: <span class="text-secondary">${sum}</span>
                    `;
                    break;
                }
                case 2: {
                    const arr1 = [1, 2, "Starship"], arr2 = [1, 2, "Starship"];
                    let isEqualArr = arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
                    output.innerHTML = `
                        Сверка массивов: <span class="text-secondary">${isEqualArr ? 'Идентичны' : 'Ошибка'}</span>
                    `;
                    break;
                }
                case 3: {
                    const obj1 = { engine: "Raptor", status: "OK" };
                    const obj2 = { engine: "Raptor", status: "OK" };
                    let isEqualObj = JSON.stringify(obj1) === JSON.stringify(obj2);
                    output.innerHTML = `
                        Сверка объектов: <span class="text-secondary">${isEqualObj ? 'Совпадают' : 'Различаются'}</span>
                    `;
                    break;
                }
                case 4: {
                    const payload = ["Панели", "Ровер", "Провизия", "Медикаменты", "Кислород"];
                    const num = 2;
                    let arr = [...payload];
                    let start = 0;
                    let end = arr.length - 1;

                    if (num > 0) start = num;
                    else if (num < 0) end = arr.length - 1 + num;

                    if (start < end) {
                        do {
                            let temp = arr[start];
                            arr[start] = arr[end];
                            arr[end] = temp;
                            start++;
                            end--;
                        } while (start < end);
                    }
                    output.innerHTML = `
                        Оригинал: <span class="text-secondary">Пан, Ров, Пров, Мед, Кис</span><br>
                        Инверсия (num=${num}): <span class="text-secondary">${arr.join(", ")}</span>
                    `;
                    break;
                }
            }
        });
    }
}
