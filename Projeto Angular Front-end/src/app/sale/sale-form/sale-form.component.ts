import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from './../../models/client.model';
import { Product } from './../../models/product.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SaleService } from './../../services/sale.service';
import { ProductService } from './../../services/product.service';
import { ClientService } from './../../services/client.service';
import { Sale } from './../../models/sale.model';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {

  dataSourceItemSale: MatTableDataSource<any>;
  displayedColumns = ["item", "price", "amount", "subTotal"]
  unSubscribe: Subject<any> = new Subject<any>();
  listProducts: Product[] = [];
  listClients: Client[] = [];
  sale = new Sale();
  total = 0;

  formSale = this.fb.group({
    client: {
      id: [""],
      name: [""],
      email: [""],
      birth: [""]
    }
  });

  itemSale = this.fb.group({
    product: {
      id: [""],
      name: [""],
      description: [""],
      price: [""]
    },
    amount: ["", [Validators.required, Validators.min(1)]]
  })

  constructor(
    public dialogRef: MatDialogRef<SaleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public saleEdit: Sale,
    private matDialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    private clientService: ClientService,
    private productService: ProductService,
    private saleService: SaleService,
    public matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getListClients();
    this.getListProducts();
  }

  getListClients() {
    this.clientService.get()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        (listClients) => this.listClients = listClients,
        (error) => this.matSnackBar.open("Error loading clients list!", "", { duration: 3000 })
      );
  }

  getListProducts() {
    this.productService.get()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        (listProducts) => this.listProducts = listProducts,
        (error) => this.matSnackBar.open("Error loading products list!", "", { duration: 3000 })
      );
  }

  insertItemSale() {
    const index = this.hasItemSale();
    if (index != -1) {
      this.sale.items[index].amount += this.itemSale.value.amount;
    } else {
      this.sale.items.push(this.itemSale.value);
    }
    this.dataSourceItemSale = new MatTableDataSource(this.sale.items);
    this.calcTotalPrice();
    this.itemSale.reset();
  }

  hasItemSale() {
    for (let item of this.sale.items) {
      if (item.product.id == this.itemSale.value.product.id) {
        return this.sale.items.indexOf(item);
      }
    }
    return -1;
  }

  finalizeSale() {
    this.sale.client = this.formSale.value.client;
    this.saleService.save(this.sale)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => {
          this.matSnackBar.open("Sale save success!", "", { duration: 3000 })
          this.matDialogRef.close();
        },
        (error) => {
          this.matSnackBar.open("Error save Sale!", "", { duration: 3000 });
          console.log(error);
        }
      );
  }

  calcTotalPrice() {
    this.total = 0;
    return this.sale.items.forEach(item => this.total += item.product.price * item.amount)
  }

  showSale() {
    this.sale.client = this.formSale.value.client;
    console.log(this.sale);
  }

}
