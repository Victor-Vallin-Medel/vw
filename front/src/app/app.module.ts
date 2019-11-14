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
import { UsersService } from './services/users.service';
import { CarsService } from './services/cars.service';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HomeClientComponent } from './components/home-client/home-client.component';
import { ViewServiceComponent } from './components/view-service/view-service.component';
import { ViewCarComponent } from './components/view-car/view-car.component';
import { HistoryServiceComponent } from './components/history-service/history-service.component';

@NgModule({
  declarations: [
    AppComponent,
    // NotFoundComponent,
    HomeClientComponent,
    ViewServiceComponent,
    ViewCarComponent,
    LoginComponent,
    RegisterComponent,
    ScheduleComponent,
    HistoryServiceComponent,
    StatusPipe
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
    UsersService,
    CarsService
  ],
  entryComponents: [
    RegisterComponent,
    ScheduleComponent,
    ViewServiceComponent,
    HistoryServiceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
