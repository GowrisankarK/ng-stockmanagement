import { Component, OnInit } from '@angular/core';
import { StockDetail } from '../../model/StockDetail';
import { StockService } from '../../service/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatNumber } from '@angular/common';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { isNumber } from 'util';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  stockDetail: StockDetail;
  stockId:  number;
  constructor(private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.queryParamMap.get('stockId')
    if(isNumber(parseInt(id))) {
    this.stockId = parseInt(id);
    } else {
      throw console.error("stockid is not an number");
    }
    this.stockService.getStockDetailsById(this.stockId).subscribe(response => {
      this.stockDetail= response;
    }, error => {
      throw console.error(error);
    });
  }

  list() {
    this.router.navigate(['../list'], {relativeTo: this.route});
  }
}
