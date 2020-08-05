import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StockDetail } from '../../model/StockDetail';
import { PapaParseService } from 'ngx-papaparse';
import { StockService } from '../../service/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isDate } from 'util';

@Component({
  selector: 'app-stock-csv-upload',
  templateUrl: './stock-csv-upload.component.html',
  styleUrls: ['./stock-csv-upload.component.css']
})
export class StockCsvUploadComponent implements OnInit {
  stockDetailList: StockDetail[] = [];
  stockDetails: StockDetail[] = [];
  disabled: boolean = true;
  error: boolean = false;
  success: boolean = false;
  constructor(private papaParseService:PapaParseService,private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  fileUploadClick(evt) {
    this.disabled = true;
    this.stockDetailList = [];
    this.error = false;
    this.success = false;
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      var csv = event.target.result;
      this.papaParseService.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          for (let i = 0; i < results.data.length; i++) {
           const stockDetail=new StockDetail();
           try {
           this.stockDetailList.push(stockDetail.patchValues(results.data[i]));
           if(isNaN(stockDetail.stockOwnerId) || isNaN(stockDetail.quantity) || isNaN(stockDetail.stockValue) ||
            isNaN(stockDetail.date.getDate()) || isNaN(stockDetail.date.getMonth()) || isNaN(stockDetail.date.getFullYear())) {
             throw new Error('Not a Valid data');
           }
           } catch(error) {
             this.error = true;
             console.log('Not valid csv: ' + error);
           }
          }
          this.stockDetails=[];
          if(!this.error) {
          this.stockDetails=this.stockDetailList;
          this.disabled = false;
          console.log('Parsed: k', results.data);
          //console.log(this.stockDetails);
          }
        }
      });
  }
}

submitCsvListData() {
  this.stockService.createListOfStockDetail(this.stockDetails).subscribe(response => {
  console.log(response);
  this.success = true;
  this.error = false;
  },error => {
    console.log(error);
    this.success = false;
    this.error = true;
  });
  this.stockDetails=[];
  this.disabled = true;
}
}
