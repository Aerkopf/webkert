import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required])
  })

  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router:Router){}

  signup():void{
    if(this.signUpForm.invalid){
      this.signupError = "Kérlek töltsön ki minden adatot!";
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');
    if(password?.value != rePassword?.value){
      this.signupError = "A jelszavak nem egyeznek!";
      return;
    }

    const newUser: User = {
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || ''
    };

    console.log('Új felhasználó: ', newUser);
    console.log('Form value:', this.signUpForm.value);

    this.showForm = false;
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }
}
