import { Component, OnInit, EventEmitter } from '@angular/core';
import { Movie } from '../movie.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  isLoading = false;
  form: FormGroup;

  constructor(public listService: ListService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('movieId')) {
        this.mode = 'edit';
        this.movieId = paramMap.get('movieId');
        this.isLoading = true;
        this.listService.getMovie(this.movieId).subscribe(postData => {
          this.isLoading = false;
          this.movie = {
            id: postData._id,
            title: postData.title,
            description: postData.description,
            type: postData.type
          };
          this.form.setValue({
            title: this.movie.title,
            description: this.movie.description,
            type: this.movie.type
          });
        });
      } else {
        this.mode = 'create';
        this.movieId = null;
      }
    });
  }

  onSaveMedia() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.listService.addMovie(
        this.form.value.title,
        this.form.value.description,
        this.form.value.type
      );
    } else {
      this.listService.updateMovie(
        this.movieId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.type
      );
    }
    this.form.reset();
  }
}
