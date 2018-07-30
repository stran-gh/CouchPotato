import { Component, OnInit, EventEmitter } from '@angular/core';
import { Movie } from '../movie.model';
import { NgForm } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-movie-item-create',
  templateUrl: './movie-item-create.component.html',
  styleUrls: ['./movie-item-create.component.css']
})
export class MovieItemCreateComponent implements OnInit {

  enteredTitle = '';
  enteredDescription = '';
  itemType = '';
  itemCreated = new EventEmitter();

  constructor(public listService: ListService) { }

  ngOnInit() {
  }

  onAddToList(form: NgForm ) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.title);
    console.log(form.value.description);
    this.listService.addMovie(form.value.title, form.value.description);
    form.resetForm();
  }
}
