import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DatabaseResponse } from '../interfaces/tMBHttp.interface';
import { ServiceConstants } from '../constants/serviceConstants';
import { Subject } from '../../../node_modules/rxjs';
import { DBMovie } from '../models/dbMovie.model';
import { DBShow } from '../models/dbShow.model';

@Injectable()
export class TMBDatabaseService {
  constructor(private http: HttpClient, private serviceConstants: ServiceConstants) {}

  private popularTVShows: DBShow[] = [];
  private popularMovies: DBMovie[] = [];
  private popularTVShowsUpdated = new Subject();
  private popularMoviesUpdated = new Subject();
  private movieSearchResult: DBMovie[] = [];
  private movieSearchUpdated = new Subject();
  searchString: string;


  searchByMovieTitle(searchQuery: string) {
    console.log('Just called the TMBDatabaseService');
    return this.http
      .get<DatabaseResponse>(
        'https://api.themoviedb.org/3/search/movie?api_key=256776cc4140ac376c95ea83c0992ea2&language=en-US&query='
        + searchQuery + '&page=1&include_adult=false'
      )
      .subscribe(fullListData => {
        for (let i = 0; i < this.serviceConstants.TOTAL_NUM_DISPLAY; i++) {
          this.movieSearchResult.push({
            id: fullListData.results[i].id,
            title: fullListData.results[i].title,
            description: fullListData.results[i].overview,
            imagePath: fullListData.results[i].backdrop_path,
            rating: fullListData.results[i].vote_average,
            releaseDate: fullListData.results[i].release_date
          });
          console.log('just pushed to the list');
        }
        this.movieSearchUpdated.next([...this.movieSearchResult]);
      });
  }

  getSearchMovieUpdateListener() {
    console.log('In the Listener');
    console.log(this.movieSearchResult);
    return this.movieSearchUpdated.asObservable();
  }

  getPopularMovies() {
    return this.http
      .get<DatabaseResponse>(
        'https://api.themoviedb.org/3/movie/popular?api_key=256776cc4140ac376c95ea83c0992ea2&language=en-US&page=1'
      )
      .subscribe(fullListData => {
        for (let i = 0; i < this.serviceConstants.TOTAL_NUM_DISPLAY; i++) {
          this.popularMovies.push({
            id: fullListData.results[i].id,
            title: fullListData.results[i].title,
            description: fullListData.results[i].overview,
            imagePath: fullListData.results[i].backdrop_path,
            rating: fullListData.results[i].vote_average,
            releaseDate: fullListData.results[i].release_date
          });
        }
        this.popularMoviesUpdated.next([...this.popularMovies]);
      });
  }

  getMovieUpdateListener() {
    return this.popularMoviesUpdated.asObservable();
  }

  getPopularTVShows() {
    return this.http.get<DatabaseResponse>(
      'https://api.themoviedb.org/3/tv/popular?api_key=256776cc4140ac376c95ea83c0992ea2&language=en-US&page=1'
    )
    .subscribe(fullListData => {
      for (let i = 0; i < this.serviceConstants.TOTAL_NUM_DISPLAY; i++) {
        this.popularTVShows.push({
          id: fullListData.results[i].id,
          title: fullListData.results[i].name,
          description: fullListData.results[i].overview,
          releaseDate: fullListData.results[i].first_air_date,
          imagePath: fullListData.results[i].backdrop_path
        });
      }
      this.popularTVShowsUpdated.next([...this.popularTVShows]);
    });
  }

  getTVShowUpdateListener() {
    return this.popularTVShowsUpdated.asObservable();
  }

}
