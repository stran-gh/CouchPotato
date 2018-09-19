import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router, private searchService: SearchService) { }

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      searchQuery: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });
  }

  onSearchPressed(searchQuery: string) {
    this.searchService.searchQuery = searchQuery;
    this.router.navigate(['/search']);
  }
}
