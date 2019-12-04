import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: 
    '<mat-card style="display: flex; justify-content: center; align-items: center">' +
    '<mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner></mat-card>',
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
