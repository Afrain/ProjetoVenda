import { MessageComponent } from './../../shared/message/message.component';
import { ProductFormComponent } from './../product-form/product-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns = ["id", "name", "description", "price", "buttons"]
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: MatDialogRef<any>;
  unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar) {

      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.get()
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (listProducts: Product[]) => this.dataSource = new MatTableDataSource(listProducts),
      (error) => this.matSnackBar.open("Error loading products list!", "", { duration: 3000 })
    );
  }

  openDialogProductForm(){
    this.dialogRef = this.matDialog.open(ProductFormComponent, {
      width: '600px',
    });
    this.updateTableProduct();
  }

  editProduct(product: Product) {
    this.dialogRef = this.matDialog.open(ProductFormComponent, {
      data: product,
      width: '600px'
    });
    this.updateTableProduct();
  }

  deleteProductDialog(product: Product) {
    this.dialogRef = this.matDialog.open(MessageComponent);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response) => {
          if (response == "true") {
            this.deleteProduct(product);
          }
        }
      );
  }

  deleteProduct(product: Product) {
    this.productService.delete(product)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      () => {
        this.listProducts();
        this.matSnackBar.open("Product delete!", "", { duration: 3000 });
      },
      (error) => {
        this.matSnackBar.open("Erro delete product!", "", { duration: 3000 });
        console.log(error);
      }
    );
  }

  updateTableProduct() {
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.listProducts();
        },
        (error) => {
          this.matSnackBar.open("Erro update tabela!", "", { duration: 3000 })
          console.error(error);
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
