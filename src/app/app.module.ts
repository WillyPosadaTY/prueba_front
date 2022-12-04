import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { flightProvider } from './services/flight/injection-token/injection-token';
import { InfoComponent } from '../components/info/info.component';
import { PersonalInfoComponent } from '../components/personal-info/personal-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    InfoComponent,
    PersonalInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    flightProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
