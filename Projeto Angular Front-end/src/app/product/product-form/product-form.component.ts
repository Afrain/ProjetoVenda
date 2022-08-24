import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Product } from '../../models/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  unSubscribe: Subject<any> = new Subject<any>();

  productForm = this.formBuild.group({
    id: [this.product ? this.product.id : ""],
    name: [this.product ? this.product.name : "", Validators.required],
    description: [this.product ? this.product.description : ""],
    price: [this.product ? this.product.price : "", Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveUpdateProduct() {
    if (this.product) {
      this.updateProduct();
    } else {
      this.saveProduct()
    }
  }

  saveProduct() {
    this.productService.save(this.productForm.value)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => {
          this.matSnackBar.open("Product save sucess!", "", { duration: 3000 });
          this.dialogRef.close();
        },
        (error) => {
          this.matSnackBar.open("Error saving product!", "", { duration: 3000 });
          console.log(error);
        }
      );
  }

  updateProduct() {
    this.productService.update(this.productForm.value)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => {
          this.matSnackBar.open("Product update sucess!", "", { duration: 3000 });
          this.dialogRef.close();
        },
        (error) => {
          this.matSnackBar.open("Error update product!", "", { duration: 3000 });
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
  }

}
