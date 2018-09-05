import { Injectable } from '@angular/core';
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
