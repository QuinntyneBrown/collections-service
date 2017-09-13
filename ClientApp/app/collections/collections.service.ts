import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Collection } from "./collection.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class CollectionsService {
    constructor(
        private _errorService: ErrorService,
        private _httpClient: HttpClient)
    { }

    public addOrUpdate(options: { collection: Collection, correlationId: string }) {
        return this._httpClient
            .post(`${this._baseUrl}/api/collections/add`, options)
            .catch(this._errorService.catchErrorResponse);
    }

    public get(): Observable<{ collections: Array<Collection> }> {
        return this._httpClient
            .get<{ collections: Array<Collection> }>(`${this._baseUrl}/api/collections/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }): Observable<{ collection:Collection}> {
        return this._httpClient
            .get<{collection: Collection}>(`${this._baseUrl}/api/collections/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public remove(options: { collection: Collection, correlationId: string }) {
        return this._httpClient
            .delete(`${this._baseUrl}/api/collections/remove?id=${options.collection.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public get _baseUrl() { return ""; }
}
