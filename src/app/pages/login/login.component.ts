import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../shared/interfaces/user';

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
export class LoginComponent implements OnInit{
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  showLoginForm: boolean = true;
  loginError: string = "";
  users:User[] = [];

  constructor(private router:Router){
  }
  ngOnInit():void{
    const data = localStorage.getItem("users");
    this.users = data ? JSON.parse(data) : [];
  }

  login(){
    this.loginError = "";


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
  }
  
}
