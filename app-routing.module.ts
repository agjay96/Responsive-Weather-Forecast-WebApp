import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeeklyComponent } from './weekly/weekly.component';
import { HourlyComponent } from './hourly/hourly.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherFormComponent } from './weatherform/weatherform.component';
//import { CurrentComponent } from './current/current.component';
import { TabComponent } from './shared/tab/tab.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: 'result', pathMatch: 'full' },
  { path: 'result', component: TabComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }