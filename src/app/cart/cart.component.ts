import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {FlowerModel} from '../models/FlowerModel';
import {SubmitOrderComponent} from "../submit-order/submit-order.component";
import {TopBarComponent} from "../top-bar/top-bar.component";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    flowers: FlowerModel[];

    constructor(
        private cartService: CartService,
    ) {
    }

    ngOnInit() {
        this.flowers = this.cartService.getItems();
    }

    removeItem(index, removeQuantity) {
        this.cartService.removeItem(index, removeQuantity);
        this.cartService.saveChange();
        TopBarComponent.totalQuantity = this.cartService.getTotalQuantity();
    }

    openDialogSubmitOrder() {
        SubmitOrderComponent.isPopupVisible = true;
    }

    changeQuantityFromButton(step, flower: FlowerModel) {
        if (flower.quantity <= 1 && step < 0 && flower.remainingStock > 0) {
            flower.quantity = 1;
        } else if (flower.quantity >= flower.remainingStock && step > 0) {
            flower.quantity = flower.remainingStock;
        } else if (flower.quantity > 0 && flower.quantity <= flower.remainingStock) {
            flower.quantity += step;
        }
        flower.totalMoney = flower.price * flower.quantity;
        TopBarComponent.totalQuantity = this.cartService.getTotalQuantity();
    }

    changeQuantityFromInput(flower: FlowerModel) {
        flower.totalMoney = flower.price * flower.quantity;
        TopBarComponent.totalQuantity = this.cartService.getTotalQuantity();
    }

    onChangeQuantity(flower: FlowerModel) {
        if (flower.quantity < 1) {
            flower.quantity = 1;
            flower.totalMoney = flower.price;
        } else if (flower.quantity > flower.remainingStock) {
            flower.quantity = flower.remainingStock;
            flower.totalMoney = flower.price * flower.quantity;
        } else {
            flower.totalMoney = flower.price * flower.quantity;
        }
        TopBarComponent.totalQuantity = this.cartService.getTotalQuantity();
    }
}
