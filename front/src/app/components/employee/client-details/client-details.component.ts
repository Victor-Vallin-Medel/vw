import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from 'src/app/models/client';
import { Car } from 'src/app/models/car';
import { UserService } from 'src/app/services/user.service';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  client: Client;
  cars: Car[];

  constructor(private userService: UserService, private carService: CarsService, private active: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.active.params.subscribe(params => {
    //       this.clientService.getClient(params.id).subscribe((client: Client) => this.client = client);
    //       this.carService.getClientCars(params.id).subscribe((cars: Car[]) => this.cars = cars);
    //     });
    //   }
    // });
  }

  goBack() {
    this.location.back();
  }

}
