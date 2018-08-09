import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ListService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  constructor(private http: HttpClient) {}

  getMovies() {
    this.http
      .get<{ message: string; movies: any }>(
        'http://localhost:3000/api/movies'
      )
      .pipe(map((postData) => {
        return postData.movies.map(movie => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            type: movie.type
          };
        });
      }))
      .subscribe(transformedMovies => {
        this.movies = transformedMovies;
        this.moviesUpdated.next([...this.movies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(title: string, description: string, type: string) {
    const movie: Movie = {
      id: null,
      title: title,
      description: description,
      type: type
    };
    this.http
      .post<{ message: string, movieId: string }>('http://localhost:3000/api/movies/', movie)
      .subscribe(responseData => {
        const id = responseData.movieId;
        movie.id = id;
        this.movies.push(movie);
        this.moviesUpdated.next([...this.movies]);
      });
  }

  deleteMovie(movieId: string) {
    this.http
      .delete('http://localhost:3000/api/movies/' + movieId)
      .subscribe(() => {
          const updatedMovies = this.movies.filter(post => post.id !== movieId);
          this.movies = updatedMovies;
          this.moviesUpdated.next([...this.movies]);
      });
  }
}
