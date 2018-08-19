import { Movie } from './movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ListService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<Movie[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getMovies() {
    this.http
      .get<{ message: string; movies: any }>('http://localhost:3000/api/movies')
      .pipe(
        map(postData => {
          return postData.movies.map(movie => {
            return {
              id: movie._id,
              title: movie.title,
              description: movie.description,
              type: movie.type,
              imagePath: movie.imagePath
            };
          });
        })
      )
      .subscribe(transformedMovies => {
        this.movies = transformedMovies;
        this.moviesUpdated.next([...this.movies]);
      });
  }

  getMovieUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  addMovie(title: string, description: string, type: string, image: File) {
    const movieData = new FormData();
    movieData.append('title', title);
    movieData.append('description', description);
    movieData.append('type', type);
    movieData.append('image', image, title);

    this.http
      .post<{ message: string; movie: Movie }>(
        'http://localhost:3000/api/movies/',
        movieData
      )
      .subscribe(responseData => {
        const movie: Movie = {
          id: responseData.movie.id,
          title: title,
          description: description,
          type: type,
          imagePath: responseData.movie.imagePath
        };
        this.movies.push(movie);
        this.moviesUpdated.next([...this.movies]);
        this.router.navigate(['/']);
      });
  }

  updateMovie(id: string, title: string, description: string, type: string) {
    const movie: Movie = {
      id: id,
      title: title,
      description: description,
      type: type,
      imagePath: null
    };
    this.http
      .put('http://localhost:3000/api/movies/' + id, movie)
      .subscribe(response => {
        const updatedMovies = [...this.movies];
        const oldMovieIndex = updatedMovies.findIndex(m => m.id === movie.id);
        updatedMovies[oldMovieIndex] = movie;
        this.movies = updatedMovies;
        this.moviesUpdated.next([...this.movies]);
        this.router.navigate(['/']);
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

  getMovie(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      type: string;
    }>('http://localhost:3000/api/movies/' + id);
  }
}
