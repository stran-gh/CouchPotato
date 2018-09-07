import { Component, OnInit } from '@angular/core';
import { TMBDatabaseService } from '../services/tMBDatabase.service';
import { Subscription } from '../../../node_modules/rxjs';
import { DBMovie } from '../models/dbMovie.model';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular-movie.component.html',
  styleUrls: ['./most-popular-movie.component.css']
})
export class MostPopularMovieComponent implements OnInit {
  movieList = [];
  baseImagePath = 'http://image.tmdb.org/t/p/w185/';
  private movieListSub: Subscription;
  isLoading = false;


  constructor(public tMBDatabaseService: TMBDatabaseService) { }

  ngOnInit() {
    this.isLoading = true;
    this.tMBDatabaseService.getPopularMovies();
    this.movieListSub = this.tMBDatabaseService.getMovieUpdateListener()
      .subscribe((movieListFromAPI: DBMovie[]) => {
        this.movieList = movieListFromAPI;
        this.isLoading = false;
      });
  }
}
