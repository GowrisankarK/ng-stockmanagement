import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockCreateComponent } from './stockmanagement/page/stock-create/stock-create.component';
import { StockDetailsComponent } from './stockmanagement/page/stock-details/stock-details.component';
import { StockListComponent } from './stockmanagement/page/stock-list/stock-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockCsvUploadComponent } from '../app/stockmanagement/page/stock-csv-upload/stock-csv-upload.component';
import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
  declarations: [
    AppComponent,
    StockCreateComponent,
    StockDetailsComponent,
    StockListComponent,
    StockCsvUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PapaParseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
