import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

// Ngx LoadingBar
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";

// Sweet Alert
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

// Guards
import { AuthEmployeeGuard } from './guards/auth-employee.guard';
import { AuthUserGuard } from './guards/auth-user.guard';

// Pipes
import { StatusPipe } from './pipes/status.pipe';

// Services
import { SessionService } from './services/session.service';
import { ClientService } from './services/client.service';
import { CarsService } from './services/cars.service';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { ViewCarComponent } from './components/view-car/view-car.component';
import { HistoryServiceComponent } from './components/history-service/history-service.component';


import { RegisterComponent } from './components/client/register/register.component';
import { ScheduleComponent } from './components/client/schedule/schedule.component';
import { HomeClientComponent } from './components/client/home-client/home-client.component';

import { HomeComponent } from './components/employee/home/home.component';
import { UpdateServiceComponent } from './components/employee/update-service/update-service.component';
import { CarDetailsComponent } from './components/employee/car-details/car-details.component';
import { CarsComponent } from './components/employee/cars/cars.component';
import { ClientDetailsComponent } from './components/employee/client-details/client-details.component';
import { ClientsComponent } from './components/employee/clients/clients.component';
import {  EmployeeDetailsComponent} from './components/employee/employee-details/employee-details.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { OrdersComponent } from './components/employee/orders/orders.component';

import { RolesPipe } from './pipes/roles.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // NotFoundComponent,
    ViewServiceComponent,
    ViewCarComponent,
    LoginComponent,
    // Client
    HomeClientComponent,
    RegisterComponent,
    ScheduleComponent,
    HistoryServiceComponent,
    // Employee
    HomeComponent,
    UpdateServiceComponent,
    CarDetailsComponent,
    CarsComponent,
    ClientDetailsComponent,
    ClientsComponent,
    EmployeeDetailsComponent,
    EmployeesComponent,
    OrdersComponent,

    StatusPipe,
    RolesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AuthUserGuard,
    AuthEmployeeGuard,
    SessionService,
    ClientService,
    CarsService
  ],
  entryComponents: [
    RegisterComponent,
    ScheduleComponent,
    ViewServiceComponent,
    HistoryServiceComponent,
    UpdateServiceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }