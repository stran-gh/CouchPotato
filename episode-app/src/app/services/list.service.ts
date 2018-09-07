import { Movie } from '../movie/movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ListService {
  private movies: Movie[] = [];
  private moviesUpdated = new Subject<{movies: Movie[], itemCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getMovies(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; movies: any, maxItems: number }>('http://localhost:3000/api/movies' + queryParams)
      .pipe(
        map(postData => {
          return { movies: postData.movies.map(movie => {
            return {
              id: movie._id,
              title: movie.title,
              description: movie.description,
              type: movie.type,
              imagePath: movie.imagePath
            };
          }), maxItems: postData.maxItems
        };
        })
      )
      .subscribe(transformedMovies => {
        this.movies = transformedMovies.movies;
        this.moviesUpdated.next({movies: [...this.movies], itemCount: transformedMovies.maxItems});
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
      this.router.navigate(['/']);
    });
  }

  updateMovie(
    id: string,
    title: string,
    description: string,
    type: string,
    image: File | string
  ) {
    let movieData: Movie | FormData;
    if (typeof image === 'object') {
      movieData = new FormData();
      movieData.append('title', title);
      movieData.append('description', description);
      movieData.append('image', image, title);
      movieData.append('id', id);
    } else {
      movieData = {
        id: id,
        title: title,
        description: description,
        type: type,
        imagePath: image
      };
    }
    this.http
      .put('http://localhost:3000/api/movies/' + id, movieData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deleteMovie(movieId: string) {
    return this.http
      .delete('http://localhost:3000/api/movies/' + movieId);
  }

  getMovie(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      description: string,
      type: string,
      imagePath: string,
    }>('http://localhost:3000/api/movies/' + id);
  }
}
