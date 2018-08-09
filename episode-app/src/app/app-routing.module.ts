import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieItemCreateComponent } from './movie/movie-item-create/movie-item-create.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'create', component: MovieItemCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
