import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    templateUrl: "./collection-list-item.component.html",
    styleUrls: [
        "../../styles/list-item.css",
        "./collection-list-item.component.css"
    ],
    selector: "ce-collection-list-item"
})
export class CollectionListItemComponent {  
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();		
    }
      
    @Input()
    public collection: any = {};
    
    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;        
}
