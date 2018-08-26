import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule,
         MatInputModule,
         MatCardModule,
         MatToolbarModule,
         MatExpansionModule,
         MatProgressSpinnerModule,
         MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MovieItemComponent } from './movie/movie-item/movie-item.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { TvSeriesListComponent } from './tv-series/tv-series-list/tv-series-list.component';
import { TvSeriesItemComponent } from './tv-series/tv-series-item/tv-series-item.component';
import { HeaderComponent } from './header/header.component';
import { MovieItemCreateComponent } from './movie/movie-item-create/movie-item-create.component';
import { AppRoutingModule } from './app-routing.module';
import { MostPopularComponent } from './most-popular/most-popular.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieItemComponent,
    SearchBarComponent,
    MovieListComponent,
    TvSeriesItemComponent,
    TvSeriesListComponent,
    HeaderComponent,
    MovieItemCreateComponent,
    MostPopularComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
