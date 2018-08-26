import { Component, OnInit } from '@angular/core';
import { TMBDatabaseService } from '../services/tMBDatabase.service';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent implements OnInit {
  movieList = [];
  episodeList = [];

  constructor() { }
  // constructor() { }

  ngOnInit() {
    this.movieList = ['Hello', 'My', 'Name', 'is', 'MovieList'];
    this.episodeList = ['Hello', 'My', 'Name', 'is', 'ShowList'];
    // this.tMBDatabaseService.getPopularMovies(this.movieList);
    // console.log(this.movieList);
  }

}
