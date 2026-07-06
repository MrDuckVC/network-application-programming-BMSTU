export class EditFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(id) {
        return `
            <div class="mt-5 border-top border-secondary pt-4 text-white">
                <h4 class="text-uppercase mb-4 text-warning">Редактирование телеметрии</h4>
                <form id="edit-starship-form" data-id="${id}" class="bg-black p-4 rounded border border-secondary shadow-lg">
                    <div class="mb-3">
                        <label for="input-name" class="form-label text-secondary small text-uppercase fw-bold">Название</label>
                        <input type="text" class="form-control bg-dark text-white border-secondary" id="input-name" required>
                    </div>

                    <div class="mb-3">
                        <label for="input-generation" class="form-label text-secondary small text-uppercase fw-bold">Поколение</label>
                        <select class="form-select bg-dark text-white border-secondary" id="input-generation">
                            <option value="V1">V1 (Block 1)</option>
                            <option value="V2">V2 (Starship 2.0)</option>
                            <option value="V3">V3 (Deep Space)</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="input-status" class="form-label text-secondary small text-uppercase fw-bold">Статус</label>
                        <input type="text" class="form-control bg-dark text-white border-secondary" id="input-status" required>
                    </div>

                    <div class="mb-4">
                        <label for="input-date" class="form-label text-secondary small text-uppercase fw-bold">Дата ввода</label>
                        <input type="date" class="form-control bg-dark text-white border-secondary" id="input-date" required>
                    </div>

                    <button type="submit" class="btn btn-warning w-100 text-uppercase fw-bold">Сохранить изменения (PATCH)</button>
                </form>
            </div>
        `;
    }

    fillForm(item) {
        document.getElementById('input-name').value = item.name;
        document.getElementById('input-generation').value = item.generation;
        document.getElementById('input-status').value = item.status;
        document.getElementById('input-date').value = item.commissionDate;
    }

    render(item, onSubmitCallback) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(item.id));
        this.fillForm(item);

        const form = document.getElementById('edit-starship-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            onSubmitCallback();
        });
    }
}
