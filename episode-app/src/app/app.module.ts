import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule,
         MatInputModule,
         MatCardModule,
         MatToolbarModule,
         MatExpansionModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MovieItemComponent } from './movie/movie-item/movie-item.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { TvSeriesListComponent } from './tv-series/tv-series-list/tv-series-list.component';
import { TvSeriesItemComponent } from './tv-series/tv-series-item/tv-series-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieItemComponent,
    SearchBarComponent,
    MovieListComponent,
    TvSeriesItemComponent,
    TvSeriesListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
