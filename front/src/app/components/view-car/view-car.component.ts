import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import { SessionService } from 'src/app/services/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css']
})
export class ViewCarComponent implements OnInit {

  currentCar: Observable<Car>;
  currentClient: Observable<User>;
  constructor(private router: Router, private activeRouter: ActivatedRoute, private location: Location, private carService: CarsService, private userService: UserService, private snack: MatSnackBar, private session: SessionService) { }

  ngOnInit() {
    // this.activeRouter.params.subscribe(params => {
    //   this.currentCar = this.carService.getCar(params.id);
    //   this.clientService.getUser(car.fk_client).subscribe((client: Client) => this.client = client);
    // });
  }

  goBack() {
    this.location.back();
  }

  deleteCar() {
    // this.carService.deleteCar(this.car.idAutomovil).subscribe((car: Car) => {
    //   this.snack.open(`${car.nombre} ${car.version} ${car.modelo} eliminado.`, 'Cerrar', {
    //     duration: 8000
    //   });
    //   this.router.navigate(['/home']);
    // })
  }

}
