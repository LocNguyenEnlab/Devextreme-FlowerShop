import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FlowersListComponent} from './flowers-list/flowers-list.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {FlowerDetailComponent} from './flower-detail/flower-detail.component';
import {CartComponent} from './cart/cart.component';
import {FlowerAddComponent} from './flower-add/flower-add.component';
import {LoginComponent} from './login/login.component';
import {SubmitOrderComponent} from './submit-order/submit-order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material';
import {
    DxButtonModule,
    DxDrawerModule,
    DxFormModule,
    DxListModule, DxNumberBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxToolbarModule, DxValidatorModule
} from 'devextreme-angular';

@NgModule({
    declarations: [
        AppComponent,
        FlowersListComponent,
        TopBarComponent,
        FlowerDetailComponent,
        CartComponent,
        FlowerAddComponent,
        LoginComponent,
        SubmitOrderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: FlowersListComponent},
            {path: 'flowers/:flowerId', component: FlowerDetailComponent},
            {path: 'cart', component: CartComponent},
            {path: 'add-flower', component: FlowerAddComponent},
            {path: 'edit-flower/:flowerId', component: FlowerAddComponent},
            {path: 'login', component: LoginComponent},
            {path: 'order', component: SubmitOrderComponent}
        ]),
        DxButtonModule,
        DxTextBoxModule,
        DxFormModule,
        DxToolbarModule,
        DxDrawerModule,
        DxListModule,
        DxPopupModule,
        DxValidatorModule,
        DxNumberBoxModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
