import {Component, OnInit, ViewChild} from '@angular/core';
import {FlowersService} from '../service/flowers.service';
import {CartService} from '../service/cart.service';
import {FlowerAddComponent} from '../flower-add/flower-add.component';

@Component({
    selector: 'app-flowers-list',
    templateUrl: './flowers-list.component.html',
    styleUrls: ['./flowers-list.component.scss']
})
export class FlowersListComponent implements OnInit {
    static isSession: boolean = !!sessionStorage.getItem('session');
    flowers = this.flowersService.getFlowers();
    // @ts-ignore
    @ViewChild(FlowerAddComponent) flowerAddComponent: FlowerAddComponent;

    constructor(
        private cartService: CartService,
        private flowersService: FlowersService,
    ) {}

    ngOnInit() {
    }

    openDialogAddFlower() {
        this.flowerAddComponent.openAddPopup();
    }

    get staticIsSession() {
        return FlowersListComponent.isSession;
    }
}
