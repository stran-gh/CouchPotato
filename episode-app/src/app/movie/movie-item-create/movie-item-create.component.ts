import { Component, OnInit, EventEmitter } from '@angular/core';
import { Movie } from '../movie.model';
import { NgForm } from '@angular/forms';
import { ListService } from '../list.service';
import {
  ActivatedRoute,
  ParamMap
} from '../../../../node_modules/@angular/router';

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
  private mode = 'create';
  private movieId: string;
  movie: Movie;

  constructor(public listService: ListService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movieId')) {
        this.mode = 'edit';
        this.movieId = paramMap.get('movieId');
        this.listService.getMovie(this.movieId).subscribe(postData => {
          this.movie = {id: postData._id, title: postData.title, description: postData.description, type: postData.type};
        });
        console.log(this.movie);
      } else {
        this.mode = 'create';
        this.movieId = null;
      }
    });
  }

  onSaveMedia(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.listService.addMovie(
        form.value.title,
        form.value.description,
        form.value.type
      );
    } else {
      this.listService.updateMovie(
        this.movieId,
        form.value.title,
        form.value.description,
        form.value.type
      );
    }
    form.resetForm();
  }
}
