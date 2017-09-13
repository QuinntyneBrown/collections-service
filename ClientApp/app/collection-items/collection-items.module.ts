import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { UsersModule } from "../users/users.module";

import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { TenantGuardService } from "../shared/guards/tenant-guard.service";
import { EventHubConnectionGuardService } from "../shared/guards/event-hub-connection-guard.service";
import { CurrentUserGuardService } from "../users/current-user-guard.service";

import { CollectionItemsService } from "./collection-items.service";

import { CollectionItemEditComponent } from "./collection-item-edit.component";
import { CollectionItemEditPageComponent } from "./collection-item-edit-page.component";
import { CollectionItemListItemComponent } from "./collection-item-list-item.component";
import { CollectionItemPaginatedListComponent } from "./collection-item-paginated-list.component";
import { CollectionItemPaginatedListPageComponent } from "./collection-item-paginated-list-page.component";

export const COLLECTION_ITEM_ROUTES: Routes = [{
    path: 'collectionItems',
    component: CollectionItemPaginatedListPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'collectionItems/create',
    component: CollectionItemEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'collectionItems/:id',
    component: CollectionItemEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
}];

const declarables = [
    CollectionItemEditComponent,
    CollectionItemEditPageComponent,
    CollectionItemListItemComponent,
    CollectionItemPaginatedListComponent,
    CollectionItemPaginatedListPageComponent
];

const providers = [CollectionItemsService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(COLLECTION_ITEM_ROUTES), SharedModule, UsersModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class CollectionItemsModule { }
