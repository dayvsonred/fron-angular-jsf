import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup | any;
  private formSubmitAttempt: boolean | undefined;

  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  loginUser() {
    //execute your post rquest and set token in local storage or session storage or cokie storage
    //The token may be aby string. here i'm use my_token as the token.
    localStorage.setItem('token', 'my_token');

    this.router.navigate(['dashboard']);
  }


  onSubmit() {
    this.submitted = true;
    this.authService.sign({
      email: this.form.value.userName,
      password: this.form.value.password
    }).subscribe({
      next: (res) => res,
      error: (e) => e,
    })


  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }




  creatNewUser(){
    this.router.navigate(['new/user']);
  }

}
