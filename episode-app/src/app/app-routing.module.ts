import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieItemCreateComponent } from './movie/movie-item-create/movie-item-create.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { MostPopularShowComponent } from './most-popular-show/most-popular-show.component';
import { MostPopularMovieComponent } from './most-popular-movie/most-popular-movie.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'create', component: MovieItemCreateComponent },
  { path: 'edit/:movieId', component: MovieItemCreateComponent },
  { path: 'popular/movies', component: MostPopularMovieComponent },
  { path: 'popular/shows', component: MostPopularShowComponent },
  { path: 'search', component: SearchResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
