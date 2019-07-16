import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AccountModel} from '../models/AccountModel';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../service/account.service';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {FlowersListComponent} from '../flowers-list/flowers-list.component';
import {FlowerDetailComponent} from '../flower-detail/flower-detail.component';
import notify from "devextreme/ui/notify";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    static isPopupVisible = false;
    account: AccountModel = {
        userName: '',
        passWord: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
    ) {
    }

    ngOnInit(): void {
    }

    get staticIsPopupVisible() {
        return LoginComponent.isPopupVisible;
    }

    closeLoginForm() {
        LoginComponent.isPopupVisible = false;
    }

    login() {
        if (this.accountService.isValid(this.account)) {
            this.loginSuccessfully(this.account);
        } else {
            this.loginFail();
        }
        LoginComponent.isPopupVisible = false;
    }

    loginSuccessfully(account: AccountModel) {
        sessionStorage.setItem('session', account.userName);
        FlowersListComponent.isSession = true;
        FlowerDetailComponent.isSession = true;
        TopBarComponent.btnLoginTitle = 'Hi ' + account.userName;
        notify('Log in successfully!', 'success');
    }

    loginFail() {
        notify('Account invalid!', 'error');
    }
}
