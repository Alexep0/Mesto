export default class Section {
    constructor(items, renderer, itemSelector) {
        this._items = items;
        this._renderer = renderer;
        this._itemSelector = itemSelector;
    }

    addItem(element) {
        this._itemSelector.prepend(element);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._itemSelector.append(this._renderer(item));
        })
    }


}