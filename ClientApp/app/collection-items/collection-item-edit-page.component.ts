import {Component} from "@angular/core";
import {CollectionItemsService} from "./collection-items.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./collection-item-edit-page.component.html",
    styleUrls: ["./collection-item-edit-page.component.css"],
    selector: "ce-collection-item-edit-page"
})
export class CollectionItemEditPageComponent {
    constructor(private _collectionItemsService: CollectionItemsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _correlationIdsList: CorrelationIdsList
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.collectionItem = (await this._collectionItemsService.getById({ id: this._activatedRoute.snapshot.params["id"] }).toPromise()).collectionItem;
        }
    }

    public tryToSave($event) {
        const correlationId = this._correlationIdsList.newId();
        this._collectionItemsService.addOrUpdate({ collectionItem: $event.detail.collectionItem, correlationId }).subscribe();
        this._router.navigateByUrl("/collectionItems");
    }

    public collectionItem = {};
}
