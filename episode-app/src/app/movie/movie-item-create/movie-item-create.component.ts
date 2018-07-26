import { Component, OnInit, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onAddList() {
    const movie = {
      title: this.enteredTitle,
      description: this.enteredDescription,
      type: this.itemType
    };
    // this.itemCreated.emit(movie);
  }
}
