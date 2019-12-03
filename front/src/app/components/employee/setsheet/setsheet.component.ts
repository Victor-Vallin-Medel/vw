import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Hoja } from 'src/app/models/hoja';

@Component({
  selector: 'app-setsheet',
  templateUrl: './setsheet.component.html',
  styleUrls: ['./setsheet.component.css']
})
export class SetsheetComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SetsheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hoja) { }

  ngOnInit() {
  }

}
