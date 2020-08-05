import { isDate } from 'util';
import { throwError } from 'rxjs';

export class StockDetail 
{
    id ?: number;
    stockName ?: string;
    stockOwnerId : number;
    stockOwnerName : string;
    quantity ?: number;
    stockValue : number;
    date ?: Date;
    remarks ?: string;

    patchValues(object: Object): StockDetail {
        this.stockName = object['StockName'];
        this.stockOwnerId = Number.parseInt(object['StockOwnerId']);
        this.stockOwnerName = object['StockOwnerName'];
        this.quantity = Number.parseInt(object['Quantity']);
        this.stockValue =  Number.parseInt(object['StockValue']);
        this.date = new Date(object['StockDate']);
        this.remarks = object['Remarks'];
        return this;
    }
}