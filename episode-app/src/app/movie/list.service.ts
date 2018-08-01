import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ListService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  constructor( private http: HttpClient) {}

  getMovies() {
    this.http.get<{ message: string, movies: Movie[]}>('http://localhost:3000/api/movies')
      .subscribe((postData) => {
        this.movies = postData.movies;
        this.moviesUpdated.next([...this.movies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(title: string, description: string, type: string) {
    const movie: Movie = {
      title: title,
      description: description,
      type: type
    };
    this.movies.push(movie);
    this.moviesUpdated.next([...this.movies]);
  }
}
