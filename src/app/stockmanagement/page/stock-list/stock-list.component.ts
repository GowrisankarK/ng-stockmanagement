import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockDetail } from '../../model/StockDetail';
import { StockService } from '../../service/stock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stockDetails: Observable<StockDetail[]>;
  constructor(private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stockDetails = this.stockService.getAllStocks();
  }

  deleteStock(stockId: number) {
    this.stockService.deleteStockDetailById(stockId).subscribe(response => {
     this.stockDetails = this.stockService.getAllStocks();
     console.log(response);
    });
  }

  updateDetails(stockId: number) {
    this.router.navigate(['../create'],{queryParams: {stockId}, relativeTo:this.route});
  }

  showStockDetails(stockId: number) {
    const queryParams = {stockId};
    this.router.navigate(['../detail'], {queryParams, relativeTo: this.route});
  }
}
