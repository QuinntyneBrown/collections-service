import {Component, ChangeDetectorRef} from "@angular/core";
import {CollectionItemsService} from "./collection-items.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./collection-item-paginated-list-page.component.html",
    styleUrls: ["./collection-item-paginated-list-page.component.css"],
    selector: "ce-collection-item-paginated-list-page"   
})
export class CollectionItemPaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _collectionItemsService: CollectionItemsService,
        private _correlationIdsList: CorrelationIdsList,
        private _eventHub: EventHub,
        private _router: Router
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {      
            
            if (this._correlationIdsList.hasId(x.payload.correlationId) && x.type == "[CollectionItems] CollectionItemAddedOrUpdated") {
                this._collectionItemsService.get().toPromise().then(x => {
                    this.unfilteredCollectionItems = x.collectionItems;
                    this.collectionItems = this.filterTerm != null ? this.filteredCollectionItems : this.unfilteredCollectionItems;
                    this._changeDetectorRef.detectChanges();
                });
            } else if (x.type == "[CollectionItems] CollectionItemAddedOrUpdated") {
                
            }
        });      
    }
    
    public async ngOnInit() {
        this.unfilteredCollectionItems = (await this._collectionItemsService.get().toPromise()).collectionItems;   
        this.collectionItems = this.filterTerm != null ? this.filteredCollectionItems : this.unfilteredCollectionItems;       
    }

    public tryToDelete($event) {        
        const correlationId = this._correlationIdsList.newId();

        this.unfilteredCollectionItems = pluckOut({
            items: this.unfilteredCollectionItems,
            value: $event.detail.collectionItem.id
        });

        this.collectionItems = this.filterTerm != null ? this.filteredCollectionItems : this.unfilteredCollectionItems;
        
        this._collectionItemsService.remove({ collectionItem: $event.detail.collectionItem, correlationId }).subscribe();
    }

    public tryToEdit($event) {
        this._router.navigate(["collectionItems", $event.detail.collectionItem.id]);
    }

    public handleCollectionItemsFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
        this.collectionItems = this.filterTerm != null ? this.filteredCollectionItems : this.unfilteredCollectionItems;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _collectionItems: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public collectionItems: Array<any> = [];
    public unfilteredCollectionItems: Array<any> = [];
    public get filteredCollectionItems() {
        return this.unfilteredCollectionItems.filter((x) => x.email.indexOf(this.filterTerm) > -1);
    }
}
