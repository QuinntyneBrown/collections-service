import {Component, ChangeDetectorRef} from "@angular/core";
import {CollectionsService} from "./collections.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./collection-paginated-list-page.component.html",
    styleUrls: ["./collection-paginated-list-page.component.css"],
    selector: "ce-collection-paginated-list-page"   
})
export class CollectionPaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _collectionsService: CollectionsService,
        private _correlationIdsList: CorrelationIdsList,
        private _eventHub: EventHub,
        private _router: Router
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {      
            
            if (this._correlationIdsList.hasId(x.payload.correlationId) && x.type == "[Collections] CollectionAddedOrUpdated") {
                this._collectionsService.get().toPromise().then(x => {
                    this.unfilteredCollections = x.collections;
                    this.collections = this.filterTerm != null ? this.filteredCollections : this.unfilteredCollections;
                    this._changeDetectorRef.detectChanges();
                });
            } else if (x.type == "[Collections] CollectionAddedOrUpdated") {
                
            }
        });      
    }
    
    public async ngOnInit() {
        this.unfilteredCollections = (await this._collectionsService.get().toPromise()).collections;   
        this.collections = this.filterTerm != null ? this.filteredCollections : this.unfilteredCollections;       
    }

    public tryToDelete($event) {        
        const correlationId = this._correlationIdsList.newId();

        this.unfilteredCollections = pluckOut({
            items: this.unfilteredCollections,
            value: $event.detail.collection.id
        });

        this.collections = this.filterTerm != null ? this.filteredCollections : this.unfilteredCollections;
        
        this._collectionsService.remove({ collection: $event.detail.collection, correlationId }).subscribe();
    }

    public tryToEdit($event) {
        this._router.navigate(["collections", $event.detail.collection.id]);
    }

    public handleCollectionsFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
        this.collections = this.filterTerm != null ? this.filteredCollections : this.unfilteredCollections;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _collections: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public collections: Array<any> = [];
    public unfilteredCollections: Array<any> = [];
    public get filteredCollections() {
        return this.unfilteredCollections.filter((x) => x.email.indexOf(this.filterTerm) > -1);
    }
}
