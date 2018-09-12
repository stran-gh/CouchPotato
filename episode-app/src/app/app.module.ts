import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatButtonModule,
         MatInputModule,
         MatCardModule,
         MatToolbarModule,
         MatExpansionModule,
         MatProgressSpinnerModule,
         MatPaginatorModule,
         MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { TvSeriesListComponent } from './tv-series/tv-series-list/tv-series-list.component';
import { TvSeriesItemComponent } from './tv-series/tv-series-item/tv-series-item.component';
import { HeaderComponent } from './header/header.component';
import { MovieItemCreateComponent } from './movie/movie-item-create/movie-item-create.component';
import { AppRoutingModule } from './app-routing.module';
import { TMBDatabaseService } from './services/tMBDatabase.service';
import { ServiceConstants } from './constants/serviceConstants';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { MostPopularShowComponent } from './most-popular-show/most-popular-show.component';
import { MostPopularMovieComponent } from './most-popular-movie/most-popular-movie.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    MovieListComponent,
    TvSeriesItemComponent,
    TvSeriesListComponent,
    HeaderComponent,
    MovieItemCreateComponent,
    SearchResultsComponent,
    MostPopularShowComponent,
    MostPopularMovieComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [
    TMBDatabaseService,
    HttpClient,
    ServiceConstants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
