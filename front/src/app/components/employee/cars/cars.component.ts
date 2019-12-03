import { Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car';
import { SessionService } from 'src/app/services/session.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserCar } from 'src/app/models/usercar';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CarsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsCat: string[] = ['nombre', 'version', 'modelo'];
  columnsReg: string[] = ['nombre', 'version', 'modelo', 'numserie', 'usuario.nombre'];

  dataCat: MatTableDataSource<Car>;
  dataReg: MatTableDataSource<UserCar>;

  expandedCar: {} | null;

  isLoading: boolean = true;
  groupBy: string = "Vehículos";
  groups: Observable<{ nombre: string [], version: string [], modelo: string [] }>;

  constructor(public session: SessionService, public car$: CarsService, private location: Location, private router: Router) { }

  ngOnInit() {
    this.resetGroup();

    // Obtener los diferentes valores para agrupar.
    this.car$.getDistincts().subscribe((partial: { nombre: string [], version: string [], modelo: string [] }) =>{
      this.groups = new BehaviorSubject<{ nombre: string [], version: string [], modelo: string [] }>(partial).asObservable();
    });
  }

  /**
   * Remover los filtros de agrupación.
   */
  resetGroup() {
    this.groupBy = "Vehículos";

    this.setDataCat('');
    this.setDataReg("/vista/registrados");
  }

  /**
   * Obtener los carros mostrados en la tabla catalogo
   * @param route string
   */
  setDataCat(route: string) {
    this.car$.getCarsOf(route).subscribe((partial: Car[]) => {
      this.dataCat =  new MatTableDataSource(partial);

      this.dataCat.paginator = this.paginator;
      this.dataCat.sort = this.sort;

      this.isLoading = false;
    });
  }

  /**
   * Obtener los carros mostrados en la tabla registrados
   * @param route string
   */
  setDataReg(route: string) {
    this.car$.getCarsOf(route).subscribe((partial: UserCar []) => {
      this.dataReg =  new MatTableDataSource(partial);

      this.dataReg.paginator = this.paginator;
      this.dataReg.sort = this.sort;
    });
  }
  
  /**
   * Agrupar los carros dependiendo el campo y valor.
   * @param groupBy string
   * @param value string
   */
  groupCars(groupBy: string, value: string) {
    let param = `${groupBy}=${value}`;
    
    this.groupBy = value;

    this.setDataCat(`/vista/catalogo/?${param}`);
    this.setDataReg(`/vista/registrados/?${param}`);
  }

  /**
   * Filtrar los vehículos dependiendo del texto escrito.
   * @param filterValue string
   */
  applyFilter(filterValue: string) {
    this.dataCat.filter = filterValue.trim().toLowerCase();
    this.dataReg.filter = filterValue.trim().toLowerCase();

    if (this.dataCat.paginator)
      this.dataCat.paginator.firstPage();
    if (this.dataReg.paginator)
      this.dataCat.paginator.firstPage();
  }

  /**
   * Regresar
   */
  goBack() {
    this.location.back();
  }

}
