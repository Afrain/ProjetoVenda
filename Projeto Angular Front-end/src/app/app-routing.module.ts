import { SaleListComponent } from './sale/sale-list/sale-list.component';
import { SaleFormComponent } from './sale/sale-form/sale-form.component';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sale'},
  { path: 'client', component: ClientListComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'sale', component: SaleListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
