export default class Section {
    constructor(items, renderer, itemSelector) {
        this._items = items;
        this._renderer = renderer;
        this._itemSelector = itemSelector;
    }

    addItem(element) {
        this._itemSelector.prepend(element);
    } 

    renderItems() {
        this._items.forEach((item) => {
            this._itemSelector.prepend(this._renderer(item));
        })
    }
}