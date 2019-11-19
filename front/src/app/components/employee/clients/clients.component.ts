import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: User [];

  constructor(private userService: UserService, private location: Location, private router: Router) { }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.clientService.getClients().subscribe((clients: Client[]) => this.clients = clients);
    //   }
    // });
  }
  
  goBack() {
    this.location.back();
  }

}
