import {Component, OnInit} from '@angular/core';
import {FlowersService} from '../service/flowers.service';
import {FlowerModel} from '../models/FlowerModel';
import notify from "devextreme/ui/notify";

@Component({
    selector: 'app-flower-add',
    templateUrl: './flower-add.component.html',
    styleUrls: ['./flower-add.component.scss']
})
export class FlowerAddComponent implements OnInit {
    static isPopupVisible = false;
    flowerId: number;
    flowers: FlowerModel[];
    flower: FlowerModel = this.flowersService.getFlower(this.flowerId);
    isAdded: boolean;

    constructor(
        private flowersService: FlowersService,
    ) {
    }

    ngOnInit() {
    }

    isValid() {
        if (this.flower.name.length === 0 || this.flower.price === 0 ||
            this.flower.imageLink.length === 0 || this.flower.remainingStock === 0) {
            return false;
        } else {
            return true;
        }
    }

    openAddPopup() {
        FlowerAddComponent.isPopupVisible = true;
        this.isAdded = true;
        this.flower = {
            id: null,
            name: '',
            price: 0,
            imageLink: '',
            remainingStock: 0,
            quantity: null,
            totalMoney: null,
        };
    }

    openEditPopup(flowerId) {
        FlowerAddComponent.isPopupVisible = true;
        this.flowerId = flowerId;
        this.flower = this.flowersService.getFlower(this.flowerId);
        this.isAdded = false;
    }

    get staticIsPopupVisible() {
        return FlowerAddComponent.isPopupVisible;
    }


    onSubmit(flower: FlowerModel) {
        if (this.isAdded === true) {
            this.addFlower(flower);
        } else {
            this.editFlower(flower);
        }
        FlowerAddComponent.isPopupVisible = false;
    }

    addFlower(flower: FlowerModel) {
        this.flowers = this.flowersService.getFlowers();
        if (this.flowers.length === 0) {
            flower.id = 1;
        } else {
            flower.id = +this.flowers[this.flowers.length - 1].id + 1;
        }
        flower.price = +(flower.price.toString().replace(',',''));
        flower.remainingStock = +(flower.remainingStock.toString().replace(',',''));
        flower.quantity = 0;
        flower.totalMoney = 0;
        this.flowersService.addFlower(flower);
        this.flowersService.saveChange();
        notify('Add a flower successfully', 'success');
    }

    editFlower(flower: FlowerModel) {
        flower.id = this.flower.id;
        flower.quantity = 0;
        flower.totalMoney = 0;
        flower.price = +(flower.price.toString().replace(',',''));
        flower.remainingStock = +(flower.remainingStock.toString().replace(',',''));
        this.flowersService.editFlower(flower);
        this.flowersService.saveChange();
        notify('Edit a flower successfully!', 'success');
    }

    closePopup() {
        FlowerAddComponent.isPopupVisible = false;
    }

    formatNumber(id) {
        // format number 1000000 to 1,234,567
        // @ts-ignore
        document.getElementById(id).value = document.getElementById(id).value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
