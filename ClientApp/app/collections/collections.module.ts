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

import { CollectionsService } from "./collections.service";

import { CollectionEditComponent } from "./collection-edit.component";
import { CollectionEditPageComponent } from "./collection-edit-page.component";
import { CollectionListItemComponent } from "./collection-list-item.component";
import { CollectionPaginatedListComponent } from "./collection-paginated-list.component";
import { CollectionPaginatedListPageComponent } from "./collection-paginated-list-page.component";

export const COLLECTION_ROUTES: Routes = [{
    path: 'collections',
    component: CollectionPaginatedListPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'collections/create',
    component: CollectionEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'collections/:id',
    component: CollectionEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
}];

const declarables = [
    CollectionEditComponent,
    CollectionEditPageComponent,
    CollectionListItemComponent,
    CollectionPaginatedListComponent,
    CollectionPaginatedListPageComponent
];

const providers = [CollectionsService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(COLLECTION_ROUTES), SharedModule, UsersModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class CollectionsModule { }
