import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { StockDetail } from '../../model/StockDetail';
import { StockService } from '../../service/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StockListComponent implements OnInit {

  //@ViewChild('checkBox') checkBox: ElementRef;

  buttonDisabled: boolean = true;
  isDisabled: boolean = false;
  stockDetails: Observable<StockDetail[]>;
  ExportList: StockDetail[] = [];
  stockDetailsFinal: Map<number,StockDetail> = new Map<number,StockDetail>();
  constructor(private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stockDetails = this.stockService.getAllStocks();
    this.stockService.getAllStocks().subscribe(response => {
      response.forEach(res=> {
        this.stockDetailsFinal.set(res.id, res);
      });
    });   
  }

  deleteStock(stockId: number) {
    this.stockService.deleteStockDetailById(stockId).subscribe(response => {
     this.stockDetails = this.stockService.getAllStocks();
    });
  }

  updateDetails(stockId: number) {
    this.router.navigate(['../create'],{queryParams: {stockId}, relativeTo:this.route});
  }

  showStockDetails(stockId: number) {
    const queryParams = {stockId};
    this.router.navigate(['../detail'], {queryParams, relativeTo: this.route});
  }

  checkboxSelection(stockId: number) {
    if(!isNullOrUndefined(this.stockDetailsFinal.get(stockId))) {
    this.ExportList.push(this.stockDetailsFinal.get(stockId));
    this.buttonDisabled= false;
    }
    if(this.ExportList.length >= 5) {
      //this.checkBox.nativeElement.disabled = true;
      this.isDisabled= true;
    }
  }

  csvDownload(demo: string) {
    if(!this.buttonDisabled && this.ExportList.length>0) {
    console.log(this.ExportList);
    const options = {
      headers: ["StockId","StockName","StockOwnerId","StockOwnerName",
      "Quantity",
      "StockValue",
      "StockDate",
      "Remarks"
      ]
    };
      new ngxCsv(this.ExportList,'MyReport', options);
  }
}
}
