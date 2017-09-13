import {
    Component,
    Input,
    OnInit,
    EventEmitter,
    Output,
    AfterViewInit,
    AfterContentInit,
    Renderer,
    ElementRef,
} from "@angular/core";

import {FormGroup,FormControl,Validators} from "@angular/forms";

@Component({
    templateUrl: "./collection-item-edit.component.html",
    styleUrls: [
        "../../styles/forms.css",
        "../../styles/edit.css",
        "./collection-item-edit.component.css"],
    selector: "ce-collection-item-edit"
})
export class CollectionItemEditComponent {
    constructor() {
        this.tryToSave = new EventEmitter();
    }

    @Output()
    public tryToSave: EventEmitter<any>;

    private _collectionItem: any = {};

    @Input("collectionItem")
    public set collectionItem(value) {
        this._collectionItem = value;

        this.form.patchValue({
            id: this._collectionItem.id,
            name: this._collectionItem.name,
        });
    }
   
    public form = new FormGroup({
        id: new FormControl(0, []),
        name: new FormControl('', [Validators.required])
    });
}
