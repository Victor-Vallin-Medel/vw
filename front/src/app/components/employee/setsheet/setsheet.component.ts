import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Hoja } from 'src/app/models/hoja';
import { SessionService } from 'src/app/services/session.service';
import { HojaService } from 'src/app/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReparacionService } from 'src/app/services/reparacion.service';

@Component({
  selector: 'app-setsheet',
  templateUrl: './setsheet.component.html',
  styleUrls: ['./setsheet.component.css']
})
export class SetsheetComponent implements OnInit {

  right: boolean = false;
  selectedRefs: [];

  constructor(public dialogRef: MatDialogRef<SetsheetComponent>, @Inject(MAT_DIALOG_DATA) public data: Hoja, public session: SessionService, public order$: HojaService, public ref$: ReparacionService, private snack: MatSnackBar) { }

  ngOnInit() {
    if (this.session.user.roles_idroles == 1 && this.data.states_idstates <= 2) this.right = true
    else if (this.session.user.roles_idroles == 3 && (this.data.states_idstates == 3 || this.data.states_idstates == 4)) this.right = true;
    else if (this.session.user.roles_idroles == 4 && this.data.states_idstates == 5) this.right = true;

    else this.right = false;

    this.ref$.getReparaciones();
  }

  update() {
    // TODO: Insert refs.
    this.order$.patchHoja(this.data.states_idstates + 1, this.data.idhojaRecepcion).subscribe(
      res => {
        this.dialogRef.close();
        this.snack.open('¡Orden actualizada!', 'Close', { duration: 6000 });
      },
      (err: HttpErrorResponse) => {
        this.snack.open(err.error.error, 'Close', { duration: 6000 });
      }
    )
  }

}
