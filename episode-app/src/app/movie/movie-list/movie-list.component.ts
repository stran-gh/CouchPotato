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

  constructor(public listService: ListService) { }

  ngOnInit() {
    this.movies = this.listService.getMovies();
    this.listSub = this.listService.getMovieUpdateListener()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      });
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
