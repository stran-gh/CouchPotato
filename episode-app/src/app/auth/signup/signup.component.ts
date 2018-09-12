import { Component } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  isLoading: Boolean = false;

  onSignup(form: NgForm) {
    console.log(form.value);
  }
}
