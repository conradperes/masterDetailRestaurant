import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[];
  isValid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderSevice: OrderService) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    if (this.data.orderItemIndex == null) {
      this.formData = {
        orderItemID: null,
        orderID: this.data.OrderID,
        itemID: 0,
        name: '',
        price: 0,
        quantity: 0,
        total: 0
      };
    } else {
      this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]);
    }
  }

  updatePrice(ctrl) {
    if (ctrl.selectedIndex === 0) {
      this.formData.price = 0;
      this.formData.name = '';
    } else {
      this.formData.price = this.itemList[ctrl.selectedIndex - 1].price;
      this.formData.name = this.itemList[ctrl.selectedIndex - 1].name;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.total = parseFloat((this.formData.quantity * this.formData.price).toFixed(2));
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemIndex == null){}
      this.orderSevice.orderItems.push(form.value);
    } else {
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
    }
    this.dialogRef.close();
    }


  validateForm(FormData: OrderItem) {
    this.isValid = true;
    if ( FormData.itemID === 0 ) {
      this.isValid = false;
    } else if (FormData.quantity === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

}
