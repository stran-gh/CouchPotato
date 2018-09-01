import { Component, OnInit, OnDestroy } from '@angular/core';
import { TMBDatabaseService } from '../../services/tMBDatabase.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { SearchService } from '../../services/search.service';
import { Movie } from '../../movie/movie.model';
import { DBMovie } from '../../models/dbMovie.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  constructor(public tMBDatabaseService: TMBDatabaseService, public searchService: SearchService) { }

  searchResults = [];
  private searchListSub: Subscription;
  baseImagePath = 'http://image.tmdb.org/t/p/w185/';
  searchQuery: string;

  ngOnInit() {
    this.searchQuery = this.searchService.searchQuery;
    this.tMBDatabaseService.searchByMovieTitle(this.searchQuery);
    this.searchListSub = this.tMBDatabaseService.getSearchMovieUpdateListener()
      .subscribe((movies: DBMovie[]) => {
        this.searchResults = movies;
        console.log('movies back beck from the service:' + this.searchResults);
      });
  }

  ngOnDestroy() {
    this.searchListSub.unsubscribe();
  }
}
