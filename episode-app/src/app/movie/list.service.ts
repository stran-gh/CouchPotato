import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ListService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  getMovies() {
    return [...this.movies];
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
    console.log(movie);
    this.movies.push(movie);
    console.log(this.movies);
    this.moviesUpdated.next([...this.movies]);
  }
}
