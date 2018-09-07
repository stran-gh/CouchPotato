import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Movie } from '../movie.model';
import { ListService } from '../../services/list.service';
import { PageEvent } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  private listSub: Subscription;
  isLoading = false;
  totalItems = 10;
  itemsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public listService: ListService) { }

  ngOnInit() {
    this.isLoading = true;
    this.listService.getMovies(this.itemsPerPage, 1);
    this.listSub = this.listService.getMovieUpdateListener()
      .subscribe((movieData: {movies: Movie[], itemCount: number }) => {
        this.isLoading = false;
        this.movies = movieData.movies;
        this.totalItems = movieData.itemCount;
      });
  }

  onDelete(movieId: string) {
    this.isLoading = true;
    this.listService.deleteMovie(movieId).subscribe(() => {
      this.listService.getMovies(this.itemsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    this.listService.getMovies(this.itemsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
