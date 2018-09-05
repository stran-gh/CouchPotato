import { Component, OnInit, OnDestroy } from '@angular/core';
import { TMBDatabaseService } from '../../services/tMBDatabase.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { SearchService } from '../../services/search.service';
import { Movie } from '../../movie/movie.model';
import { DBMovie } from '../../models/dbMovie.model';
import { DBShow } from '../../models/dbShow.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  constructor(public tMBDatabaseService: TMBDatabaseService, public searchService: SearchService) { }

  movieSearchResults = [];
  tvSearchResults = [];
  private movieSearchListSub: Subscription;
  private tvSearchListSub: Subscription;
  baseImagePath = 'http://image.tmdb.org/t/p/w185/';
  searchQuery: string;
  displayMovies: Boolean;

  ngOnInit() {
    this.searchQuery = this.searchService.searchQuery;
    this.tMBDatabaseService.searchByMovieTitle(this.searchQuery);
    this.movieSearchListSub = this.tMBDatabaseService.getSearchMovieUpdateListener()
      .subscribe((movies: DBMovie[]) => {
        this.movieSearchResults = movies;
      });
    this.tMBDatabaseService.searchByShowTitle(this.searchQuery);
    this.tvSearchListSub = this.tMBDatabaseService.getSearchShowUpdateListener()
      .subscribe((shows: DBShow[]) => {
        this.tvSearchResults = shows;
      });
      this.displayMovies = true;
  }

  onShowsClicked() {
    this.displayMovies = false;
  }

  onMoviesClicked() {
    this.displayMovies = true;
  }

  ngOnDestroy() {
    this.movieSearchListSub.unsubscribe();
    this.tvSearchListSub.unsubscribe();
  }
}
