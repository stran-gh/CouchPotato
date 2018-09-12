import { Component } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading: Boolean = false;

  onLogin(form: NgForm) {
    console.log(form.value);
  }
}
