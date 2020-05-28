import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { WeatherFormComponent } from './weatherform/weatherform.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { TempCardComponent } from './temp-card/temp-card.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { TabComponent } from './shared/tab/tab.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GraphComponent } from './graph/graph.component';
import { HourlyComponent } from './hourly/hourly.component';

import { LocationCallService } from './location/location-call.service';
import { AutocompleteDirective } from './autocomplete/autocomplete.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
 
@NgModule({
  declarations: [
    AppComponent,
    WeatherFormComponent,
    TempCardComponent,
    LayoutComponent,
    TabComponent,
    PageNotFoundComponent,
    GraphComponent,
    HourlyComponent,
    WeeklyComponent,
    AutocompleteDirective,
    FavoritesComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AutocompleteLibModule
  ],
  providers: [LocationCallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
