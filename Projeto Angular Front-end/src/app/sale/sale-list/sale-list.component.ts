import { MessageComponent } from './../../shared/message/message.component';
import { SaleFormComponent } from './../sale-form/sale-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { SaleService } from './../../services/sale.service';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sale } from './../../models/sale.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  listSales: Sale[] = [];
  dialogRef: MatDialogRef<any>;
  unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private saleService: SaleService,
    private matSnackBar: MatSnackBar,
    public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getListSales();
  }

  getListSales() {
    this.saleService.get()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (listSales) => {
        this.listSales = listSales;
      },
      (error) => this.matSnackBar.open("Error loading Sales", "", { duration: 3000 })
    );
  }

  openDialogSaleForm() {
    this.dialogRef =  this.matDialog.open(SaleFormComponent, {

    });

    this.dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      ()=> {
        this.getListSales();
      }
    );
  }

  deleteSaleDialog(sale: Sale) {
    this.dialogRef = this.matDialog.open(MessageComponent);
    this.dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (response) => {
        if(response == "true") {
          this.deleteSale(sale);
        }
      }
    );
  }

  deleteSale(sale: Sale) {
    this.saleService.delete(sale)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      ()=> {
        this.matSnackBar.open("Delete Sale success!", "", { duration: 3000 })
        this.getListSales();
      },
      (error)=> this.matSnackBar.open("Error delete Sale!", "", { duration: 3000 })
    );
  }

  editSale(sale: Sale) {
    this.matDialog.open(SaleFormComponent, {
      data: sale
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
