import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    templateUrl: "./collection-item-list-item.component.html",
    styleUrls: [
        "../../styles/list-item.css",
        "./collection-item-list-item.component.css"
    ],
    selector: "ce-collection-item-list-item"
})
export class CollectionItemListItemComponent {  
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();		
    }
      
    @Input()
    public collectionItem: any = {};
    
    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;        
}
