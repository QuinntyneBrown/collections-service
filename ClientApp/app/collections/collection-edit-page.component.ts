import {Component} from "@angular/core";
import {CollectionsService} from "./collections.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./collection-edit-page.component.html",
    styleUrls: ["./collection-edit-page.component.css"],
    selector: "ce-collection-edit-page"
})
export class CollectionEditPageComponent {
    constructor(private _collectionsService: CollectionsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _correlationIdsList: CorrelationIdsList
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.collection = (await this._collectionsService.getById({ id: this._activatedRoute.snapshot.params["id"] }).toPromise()).collection;
        }
    }

    public tryToSave($event) {
        const correlationId = this._correlationIdsList.newId();
        this._collectionsService.addOrUpdate({ collection: $event.detail.collection, correlationId }).subscribe();
        this._router.navigateByUrl("/collections");
    }

    public collection = {};
}
