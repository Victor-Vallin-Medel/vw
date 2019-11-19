import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Car } from 'src/app/models/car';
import { Client } from 'src/app/models/client';
import { CarsService } from 'src/app/services/cars.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car: Car;
  client: Client;

  constructor(private carService: CarsService, private userService: UserService, private activate: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.activate.params.subscribe(params => {
    //       this.carService.getCar(params.id).subscribe((car: Car) => {
    //         this.car = car;
    //         this.clientService.getClient(car.fk_client).subscribe((client: Client) => this.client = client);
    //       });
    //     });
    //   }
    // })
  }

  goBack() {
    this.location.back();
  }

}
