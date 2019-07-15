import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AccountModel} from '../models/AccountModel';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../service/account.service';
import {HelperService} from '../service/helper.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    account: AccountModel = {
        userName: '',
        passWord: ''
    };

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>,
        private formBuilder: FormBuilder,
        private accountService: AccountService,
    ) {
    }

    onSubmit: any = {
        text: 'Login',
        type: 'success',
        useSubmitBehavior: true
    };

    ngOnInit(): void {
    }

    login() {
        if (this.accountService.isValid(this.account)) {
            this.loginSuccessfully(this.account);
        } else {
            this.loginFail();
        }
        this.dialogRef.close();
    }

    loginSuccessfully(account: AccountModel) {
        sessionStorage.setItem('session', account.userName);
        document.getElementById('btn-login').setAttribute('value', sessionStorage.getItem('session'));
        document.getElementById('btn-login').setAttribute('disabled', 'true');
        document.getElementById('btn-add-flower').setAttribute('type', 'button');
        document.getElementById('btn-logout').setAttribute('type', 'button');
        HelperService.toastMakeText('Log in successfully!');
    }

    loginFail() {
        HelperService.toastMakeText('Account invalid!');
    }
}
