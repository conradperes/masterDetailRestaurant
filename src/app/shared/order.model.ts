import { Item } from './item.model';

export class Order {

    orderID: number;
    orderNo: string;
    customerID: number;
    paymentMethod: string;
    total: number;
    DeletedOrderItemIDs: string;
    items: Item;
}
