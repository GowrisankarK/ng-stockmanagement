import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stockmanagement/page/stock-list/stock-list.component';
import { StockDetailsComponent } from './stockmanagement/page/stock-details/stock-details.component';
import { StockCreateComponent } from './stockmanagement/page/stock-create/stock-create.component';

const routes: Routes = [
  {
    path: 'stockmanagement/list',
    component: StockListComponent
  },
  {
    path: 'stockmanagement/detail',
    component: StockDetailsComponent
  },
  {
    path: 'stockmanagement/create',
    component: StockCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
