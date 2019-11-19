import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Client } from '../../models/client';
import { MatSnackBar } from '@angular/material';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css']
})
export class ViewCarComponent implements OnInit {

  car: Car;
  client: Client;
  constructor(private router: Router, private activeRouter: ActivatedRoute, private location: Location, private carService: CarsService, private userService: UserService, private snack: MatSnackBar, private session: SessionService) { }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.activeRouter.params.subscribe(params => {
    //       this.carService.getCar(params.id).subscribe((car: Car) => {
    //         this.car = car;
    //         this.clientService.getUser(car.fk_client).subscribe((client: Client) => this.client = client);
    //       });
    //     });
    //   }
    // });
  }

  goBack() {
    this.location.back();
  }

  deleteCar() {
    this.carService.deleteCar(this.car.plates).subscribe((car: Car) => {
      this.snack.open(`${car.name} ${car.version} ${car.model} eliminado.`, 'Cerrar', {
        duration: 8000
      });
      this.router.navigate(['/home']);
    })
  }

}
