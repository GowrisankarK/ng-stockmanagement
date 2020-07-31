import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockDetail } from '../model/StockDetail';

@Injectable({
  providedIn: 'root'
})
export class StockService {

baseUrl: string ="/api/stockMangement/v1" 

constructor(private httpClient: HttpClient) { }

getAllStocks(): Observable<StockDetail[]>  {
  return this.httpClient.get<StockDetail[]>(this.baseUrl + "/stocks");
}

getStockDetailsById(id: number) : Observable<StockDetail> {
  return this.httpClient.get<StockDetail>(this.baseUrl + "/stocks/" + id);
}

createStockDetail(stockDetail: StockDetail) : Observable<StockDetail> {
  return this.httpClient.post<StockDetail>(this.baseUrl + "/insert/stocks", stockDetail);
}

updateStockDetail(stockDetail: StockDetail) : Observable<StockDetail> {
  return this.httpClient.put<StockDetail>(this.baseUrl + "/update/stocks", stockDetail);
}

deleteStockDetailById(id: number):  Observable<Map<string, boolean>> {
  return this.httpClient.delete<Map<string, boolean>>(this.baseUrl + "/delete/" + id);
}
}
