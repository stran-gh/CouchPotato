import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../movie.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  private listSub: Subscription;
  isLoading = false;

  constructor(public listService: ListService) { }

  ngOnInit() {
    this.isLoading = true;
    this.listService.getMovies();
    this.listSub = this.listService.getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.isLoading = false;
        this.movies = movies;
      });
  }

  onDelete(movieId: string) {
    this.listService.deleteMovie(movieId);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
