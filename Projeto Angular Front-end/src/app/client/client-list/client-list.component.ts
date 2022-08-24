import { MessageComponent } from './../../shared/message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientFormComponent } from './../client-form/client-form.component';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  displayedColumns = ["id", "name", "email", "birth", "buttons"]
  dataSource: MatTableDataSource<Client>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dialogRef: MatDialogRef<any>;
  unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private clientService: ClientService,
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar) {

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listClients();
  }

  listClients() {
    this.clientService.get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (listClients: Client[]) => this.dataSource = new MatTableDataSource(listClients),
        (error) => this.matSnackBar.open("Error loading clients list!", "", { duration: 3000 })
      );
  }

  openDialogClientForm() {
    this.dialogRef = this.matDialog.open(ClientFormComponent, {
      width: '600px',
    });
    this.updateTableClient();
  }

  editClient(client: Client) {
    this.dialogRef = this.matDialog.open(ClientFormComponent, {
      data: client,
      width: '600px'
    });
    this.updateTableClient();
  }

  deleteClientDialog(client: Client) {
    this.dialogRef = this.matDialog.open(MessageComponent);
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response) => {
          if (response == "true") {
            this.deleteClient(client);
          }
        }
      );
  }

  deleteClient(client: Client) {
    this.clientService.delete(client)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.matSnackBar.open("Client delete!", "", { duration: 3000 });
          this.listClients();
        },
        (error) => {
          this.matSnackBar.open("Erro delete client!", "", { duration: 3000 });
          console.log(error);
        }
      );
  }

  updateTableClient() {
    this.dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.listClients();
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
