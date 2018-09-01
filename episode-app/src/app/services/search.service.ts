import { Movie } from '../movie/movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DBMovie } from '../models/dbMovie.model';
import { DBShow } from '../models/dbShow.model';
import { TMBDatabaseService } from './tMBDatabase.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private movies: DBMovie[] = [];
  private shows: DBShow[] = [];
  searchQuery: string;

  constructor(private tMBDatabaseService: TMBDatabaseService) {}

}
