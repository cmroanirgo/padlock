(() => {

class RecordView extends Polymer.Element {

    static get is() { return "pl-record-view"; }

    static get properties() { return {
        categories: Array,
        draft: {
            type: Boolean,
            value: false
        },
        record: {
            type: Object,
            notify: true
        }
    }; }

    _fireChangeEvent() {
        this.dispatchEvent(new CustomEvent("record-change", { detail: { record: this.record } }));
    }

    _deleteField(e) {
        this.$.confirmDialog.confirm("Are you sure you want to delete this field?", "Delete").then((confirmed) => {
            if (confirmed) {
                this.splice("record.fields", e.model.index, 1);
                this._fireChangeEvent();
            }
        });
    }

    _fieldClass(index) {
        return "tiles-" + (Math.floor((index + 1) % 8) + 1);
    }

    _spacerClass(nFields) {
        return this._fieldClass(nFields + 1);
    }

    _newFieldEnter() {
        const newField = this.$.newField.field;
        if (newField.name && newField.value) {
            this.push("record.fields", newField);
            this.$.newField.field = { name: "", value: "" };
        }
        this._fireChangeEvent();
    }

    _createRecord() {
        this.dispatchEvent(new CustomEvent("record-create", { detail: { record: this.record } }));
    }

    _deleteRecord() {
        this.$.confirmDialog.confirm("Are you sure you want to delete this record?", "Delete").then((confirmed) => {
            if (confirmed) {
                this.dispatchEvent(new CustomEvent("record-delete", { detail: { record: this.record } }));
            }
        });
    }

    _categoryFilter(currCat) {
        return currCat ? (cat) => {
            return cat && cat !== currCat && cat.toLowerCase().startsWith(currCat.toLowerCase());
        } : null;
    }

    _catOptMousedown(e) {
        e.preventDefault();
    }

    _selectCategory(e) {
        this.set("record.category", e.model.item);
        this._fireChangeEvent();
    }

    _showCategoryList() {
        this.set("record.category", "");
        this.$.categoryInput.focus();
    }

    close() {
        this.dispatchEvent(new CustomEvent("record-close"));
    }

    edit() {
        this.$.nameInput.focus();
    }

}

window.customElements.define(RecordView.is, RecordView);

})();