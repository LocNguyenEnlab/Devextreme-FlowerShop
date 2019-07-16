import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {CartService} from "../service/cart.service";
import {DxDrawerComponent} from 'devextreme-angular';
import {FlowersListComponent} from '../flowers-list/flowers-list.component';
import {FlowerDetailComponent} from '../flower-detail/flower-detail.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    static totalQuantity: number;
    static btnLoginTitle: string;
    @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;
    selectedPosition = 'top';
    selectedRevealMode = 'expand';


    toolbarContent = [{
        widget: 'dxButton',
        location: 'after',
        options: {
            position: 'right',
            icon: 'menu',
            onClick: () => this.drawer.instance.toggle()
        }
    }];

    constructor(
        private cartService: CartService,
        // private loginComponent: LoginComponent,
    ) {
        TopBarComponent.totalQuantity = this.cartService.getTotalQuantity();
    }

    ngOnInit() {
        this.checkSession();
    }

    get staticTotalQuantity() {
        return TopBarComponent.totalQuantity;
    }

    get staticBtnLoginTitle() {
        return TopBarComponent.btnLoginTitle;
    }

    checkSession() {
        if (sessionStorage.getItem('session')) {
            TopBarComponent.btnLoginTitle = 'Hi ' + sessionStorage.getItem('session');
        } else {
            TopBarComponent.btnLoginTitle = 'Login';
        }
    }

    openDialog() {
        LoginComponent.isPopupVisible = true;
    }

    logout() {
        sessionStorage.removeItem('session');
        TopBarComponent.btnLoginTitle = 'Login';
        FlowersListComponent.isSession = false;
        FlowerDetailComponent.isSession = false;
        // location.reload();
    }


}
