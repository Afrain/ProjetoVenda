import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: string;
  color: ThemePalette;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialog: MatDialogRef<MessageComponent>) { }

  ngOnInit(): void {
  }

}
