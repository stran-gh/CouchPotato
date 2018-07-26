import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  // movies = [
  //   { title: 'Movie1', description: 'This is the first movie.'},
  //   { title: 'Movie2', description: 'This is the second movie.'},
  //   { title: 'Movie3', description: 'This is the third movie.'}
  // ];

  movies = [];

  constructor() { }

  ngOnInit() {
  }

}
