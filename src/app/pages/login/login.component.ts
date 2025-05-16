import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent implements OnInit, OnDestroy{
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLoading: boolean = false;
  showLoginForm: boolean = true;
  loginError: string = "";
  //users:User[] = [];

  constructor(private router:Router, private authService:AuthService){
  }
  ngOnInit():void{
  // const data = localStorage.getItem("users");
  // this.users = data ? JSON.parse(data) : [];
  }

  login(){
    this.loginError = "";

    if(this.email.invalid){
      this.loginError = "Kérlek érvényes emailt adj meg!";
      return;
    }
    if(this.password.invalid){
      this.loginError= "A jelszó minimum 6 karakterből áll!";
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    
    this.authService.signIn(emailValue, passwordValue).then(
      userCred => {
        console.log('Sikeres bejelentkezés!', userCred.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      }
    ).catch(error =>{
        console.error('hiba a belépés során:', error);
        this.isLoading = false;
        this.showLoginForm = true;

        switch(error.code){
          case 'auth/user-not-found':
            this.loginError = 'Nincs felhasználó ilyen email címmel!';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó!';
            break;
          case 'auth/invalid-credential': 
            this.loginError = 'Hibás email vagy jelszó!';
            break;
          default:
            this.loginError = 'Ismeretlen hiba';
        }
      }
    );



/*
    if(this.users.find(u => u.email === this.email.value) && this.users.find(u => u.password === this.password.value)){
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        window.location.href = '/home';
      }, 3000);
          } else {
      this.loginError = 'helytelen email vagy jelszó!';
    }
  */
  }

  ngOnDestroy() {
    
  }
}
