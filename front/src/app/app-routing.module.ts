import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthEmployeeGuard } from './guards/auth-employee.guard';
import { AuthUserGuard } from './guards/auth-user.guard';
import { HomeClientComponent } from './components/client/home-client/home-client.component';
import { HomeComponent } from './components/employee/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewCarComponent } from './components/view-car/view-car.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ListUsersComponent } from './components/employee/list-users/list-users.component';
import { ClientDetailsComponent } from './components/employee/client-details/client-details.component';

const routes_clients: Routes = [
  { path: 'dashboard', component: HomeClientComponent, canActivate: [AuthUserGuard] },
];

const routes_employee: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthEmployeeGuard] },
  { path: 'employees', component: ListUsersComponent },
  { path: 'customers', component: ListUsersComponent },
  { path: 'employee/:id', component: SettingsComponent },
  { path: 'customer/:id', component: ClientDetailsComponent }
];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'car/:id', component: ViewCarComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes_clients, { scrollPositionRestoration: 'enabled' }),
    RouterModule.forRoot(routes_employee, { scrollPositionRestoration: 'enabled' }),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
