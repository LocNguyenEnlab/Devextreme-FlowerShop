import { Component, OnInit } from '@angular/core';
import {OrderInfoModel} from '../models/OrderInfoModel';
import {CartService} from "../service/cart.service";
import {OrderService} from "../service/order.service";
import {HelperService} from "../service/helper.service";

@Component({
    selector: 'app-submit-order',
    templateUrl: './submit-order.component.html',
    styleUrls: ['./submit-order.component.scss']
})
export class SubmitOrderComponent implements OnInit {
    static isPopupVisible = false;
    orderInfo: OrderInfoModel;

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
    ) { }

    ngOnInit() {
        this.orderInfo = {
            name: '',
            phoneNumber: '',
            flower: this.cartService.getItems(),
            totalMoney: this.cartService.getTotalMoney()
        };
    }

    onSubmitOrder() {
        this.orderService.submitOrder(this.orderInfo);
        window.location.reload();
        HelperService.toastMakeText('Your order has been submitted!');
    }

    get staticIsPopupVisible() {
        return SubmitOrderComponent.isPopupVisible;
    }

    closePopup() {
        SubmitOrderComponent.isPopupVisible = false;
    }
}
