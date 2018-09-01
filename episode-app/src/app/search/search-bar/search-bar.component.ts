import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private searchService: SearchService) { }

  ngOnInit() {
  }

  onSearchPressed(searchQuery: string) {
    console.log('The Search Button was pressed, sent: ' + searchQuery);
    this.searchService.searchQuery = searchQuery;
    console.log('The SS updated: ' + this.searchService.searchQuery);
    this.router.navigate(['/search']);
  }

}
