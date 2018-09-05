import { Component, OnInit } from '@angular/core';
import { TMBDatabaseService } from '../services/tMBDatabase.service';
import { Subscription } from '../../../node_modules/rxjs';
import { DBShow } from '../models/dbShow.model';

@Component({
  selector: 'app-most-popular-show',
  templateUrl: './most-popular-show.component.html',
  styleUrls: ['./most-popular-show.component.css']
})
export class MostPopularShowComponent implements OnInit {
  tvShowList = [];
  baseImagePath = 'http://image.tmdb.org/t/p/w185/';
  private tvShowListSub: Subscription;

  constructor(public tMBDatabaseService: TMBDatabaseService) {}

  ngOnInit() {
    this.tMBDatabaseService.getPopularTVShows();
    this.tvShowListSub = this.tMBDatabaseService
      .getTVShowUpdateListener()
      .subscribe((tvShowListFromAPI: DBShow[]) => {
        this.tvShowList = tvShowListFromAPI;
      });
  }
}
