export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3 text-white bg-dark border-secondary mt-4 shadow-lg">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}" class="img-fluid rounded-start h-100 object-fit-cover" alt="SpaceX">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body d-flex flex-column h-100">
                            <h2 class="card-title text-uppercase">${data.spacexTitle}</h2>
                            <hr class="border-secondary">
                            <p class="card-text fs-5">${data.spacexText}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
