import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CollectionItem } from "./collection-item.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class CollectionItemsService {
    constructor(
        private _errorService: ErrorService,
        private _httpClient: HttpClient)
    { }

    public addOrUpdate(options: { collectionItem: CollectionItem, correlationId: string }) {
        return this._httpClient
            .post(`${this._baseUrl}/api/collectionItems/add`, options)
            .catch(this._errorService.catchErrorResponse);
    }

    public get(): Observable<{ collectionItems: Array<CollectionItem> }> {
        return this._httpClient
            .get<{ collectionItems: Array<CollectionItem> }>(`${this._baseUrl}/api/collectionItems/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }): Observable<{ collectionItem:CollectionItem}> {
        return this._httpClient
            .get<{collectionItem: CollectionItem}>(`${this._baseUrl}/api/collectionItems/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public remove(options: { collectionItem: CollectionItem, correlationId: string }) {
        return this._httpClient
            .delete(`${this._baseUrl}/api/collectionItems/remove?id=${options.collectionItem.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public get _baseUrl() { return ""; }
}
