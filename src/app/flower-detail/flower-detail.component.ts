import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlowersService} from '../service/flowers.service';
import {FlowerModel} from '../models/FlowerModel';
import {FlowerAddComponent} from '../flower-add/flower-add.component';
import {CartService} from '../service/cart.service';
import {HelperService} from '../service/helper.service';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {FlowersListComponent} from '../flowers-list/flowers-list.component';

@Component({
    selector: 'app-flower-detail',
    templateUrl: './flower-detail.component.html',
    styleUrls: ['./flower-detail.component.scss']
})
export class FlowerDetailComponent implements OnInit {
    static isSession = FlowersListComponent.isSession;
    flower: FlowerModel;
    // @ts-ignore
    @ViewChild(FlowerAddComponent) flowerAddComponent: FlowerAddComponent;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private flowersService: FlowersService,
        private cartService: CartService,
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.flower = this.flowersService.getFlower(+params.get('flowerId'));
        });
        this.checkFlower();
    }

    checkFlower() {
        if (this.flower.remainingStock > 0) {
            this.flower.quantity = 1;
            this.flower.totalMoney = this.flower.price;
        } else {
            this.flower.quantity = 0;
            this.flower.totalMoney = 0;
        }
    }

    openDialogEditFlower(flowerId) {
        // FlowerAddComponent.openEditPopup(flowerId);
        this.flowerAddComponent.openEditPopup(flowerId);
    }

    removeFlower(flowerId) {
        this.flowersService.removeFlower(flowerId);
        this.flowersService.saveChange();
        this.router.navigate(['']);
        HelperService.toastMakeText('Your flower has been removed!');
    }

    changeQuantityFromButton(step) {
        if (this.flower.quantity <= 1 && step < 0 && this.flower.remainingStock > 0) {
            this.flower.quantity = 1;
        } else if (this.flower.quantity >= this.flower.remainingStock && step > 0) {
            this.flower.quantity = this.flower.remainingStock;
        } else if (this.flower.quantity > 0 && this.flower.quantity <= this.flower.remainingStock) {
            this.flower.quantity += step;
        }
        this.flower.totalMoney = this.flower.price * this.flower.quantity;
    }

    changeQuantityFromInput() {
        this.flower.totalMoney = this.flower.price * this.flower.quantity;
    }

    onChangeQuantity() {
        if (this.flower.quantity < 1) {
            this.flower.quantity = 1;
            this.flower.totalMoney = this.flower.price;
        } else if (this.flower.quantity > this.flower.remainingStock) {
            this.flower.quantity = this.flower.remainingStock;
            this.flower.totalMoney = this.flower.price * this.flower.quantity;
        } else {
            this.flower.totalMoney = this.flower.price * this.flower.quantity;
        }
    }

    addToCart(flower: FlowerModel) {
        this.cartService.addToCart(flower);
        this.cartService.saveChange();
        HelperService.toastMakeText('Your flower has been added to cart!');
        TopBarComponent.totalQuantity = this.cartService.getTotalQuantity();
    }

    get staticIsSession() {
        return FlowerDetailComponent.isSession;
    }
}
