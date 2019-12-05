import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ReparacionService } from 'src/app/services/reparacion.service';
import { RefaccionService } from 'src/app/services/refaccion.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Reparacion } from 'src/app/models/reparacion';
import { Refaccion } from 'src/app/models/refaccion';
import { trigger, state, transition, style, animate } from '@angular/animations';

export interface RepAndRefs extends Reparacion {
  refacciones: Refaccion []
}

@Component({
  selector: 'app-list-rep',
  templateUrl: './list-rep.component.html',
  styleUrls: ['./list-rep.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListRepComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean = true;
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio'];
  dataSource: MatTableDataSource<RepAndRefs>;

  expandedRep: RepAndRefs | null;

  constructor(public session: SessionService, public rep$: ReparacionService, public ref$: RefaccionService) { }

  ngOnInit() {
    this.rep$.getRefsWithRep().subscribe((partial: RepAndRefs []) => {
      partial.forEach(r => r.parser = JSON.parse(r.descripcion));

      this.isLoading = false;
      this.dataSource = new MatTableDataSource(partial);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
