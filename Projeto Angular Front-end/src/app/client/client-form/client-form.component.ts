import { Client } from '../../models/client.model';
import { takeUntil } from 'rxjs/operators';
import { ClientService } from '../../services/client.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  unSubscribe: Subject<any> = new Subject<any>();

  clientForm = this.formBuild.group({
    id: [this.client ? this.client.id : ""],
    name: [this.client ? this.client.name : "", Validators.required],
    email: [this.client ? this.client.email : "", [Validators.required, Validators.email]],
    birth: [this.client ? this.client.birth : ""]
  });

  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public client: Client,
    private formBuild: FormBuilder,
    private clientService: ClientService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveUpdateClient() {
    if (this.clientForm.value.birth != "") {
      const newData: moment.Moment = moment.utc(this.clientForm.value.birth).local();
      this.clientForm.value.birth = newData.format(`YYYY-MM-DD`);
    }
    if (this.client) {
      this.updateClient();
    } else {
      this.saveClient();
    }
  }

  saveClient() {
    this.clientService.save(this.clientForm.value)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => {
          this.matSnackBar.open("Client save success!", "", { duration: 3000 });
          this.dialogRef.close();
        },
        (error) => {
          this.matSnackBar.open("Error saving client!", "", { duration: 3000 });
          console.log(error);
        }
      );
  }

  updateClient() {
    this.clientService.edit(this.clientForm.value)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => {
          this.matSnackBar.open("Client update success!", "", { duration: 3000 });
          this.dialogRef.close();
        },
        (error) => {
          this.matSnackBar.open("Error update client!", "", { duration: 3000 });
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
  }

}
