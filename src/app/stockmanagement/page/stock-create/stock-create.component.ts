import { Component, OnInit } from '@angular/core';
import { StockDetail } from '../../model/StockDetail';
import { StockService } from '../../service/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  stock: StockDetail= new StockDetail();
  submitted: boolean = false;
  error: boolean = false;
  stockId: number;

  constructor(private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id=this.route.snapshot.queryParamMap.get('stockId');
    if(!isNaN(parseInt(id))) {
      this.stockId=parseInt(id);
      this.stockService.getStockDetailsById(this.stockId).subscribe(response => {
        this.stock= response;
      }, error => {
        throw console.error(error);
      });
    }
  }

  onSubmit() {
    if(isNullOrUndefined(this.stock.stockOwnerId) && isNullOrUndefined(this.stock.stockName)
    && isNullOrUndefined(this.stock.quantity) && isNullOrUndefined(this.stock.stockValue)) {
      this.error = true;
    } else {
      this.error = false;
      this.stockService.createStockDetail(this.stock).subscribe(response => {
        this.submitted = true;
        console.log(response);
      },
      error => {
        console.log(error);
      });
      this.goBackToList();
    }
  }

  
  newEmployee() {
    this.submitted= false;
    this.stock = new StockDetail();
  }

  goBackToList(): void {
   this.router.navigate(['./list'],{relativeTo: this.route}); 
  }
}
