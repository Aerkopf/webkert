import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';

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
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required])
  })

  isLoading = false;
  showForm = true;
  signupError = '';
  users: User[] = [];

  constructor(private router:Router, private authService: AuthService){}

  ngOnInit(): void {
    this.isLoading = false;
    this.showForm = true;
    
  
  }


  signup():void{
    if(this.signUpForm.invalid){
      this.signupError = 'Kérem minden adatot töltsön ki!';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const repassword = this.signUpForm.get('rePassword')?.value;

    if(password !== repassword){
      this.signupError = 'A megadott jelszavak nem egyeznek!';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {
      email : this.signUpForm.value.email || '',
      jaratok: []
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService.signup(email, pw, userData).then(
      userCredential => {
        console.log('Sikeres regisztráció: ', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      }
    ).catch(error => {
      console.error('Hiba a regisztráció során:', error);
      this.isLoading = false;
      this.showForm = true;

      switch(error.code){
        case 'auth/email-already-in-use':
          this.signupError = 'Ez az email már regisztrálva van!';
          break;
        case 'auth/invalid-email':
          this.signupError = 'Érvénytelen email!';
          break;
        case 'auth/weak-password':
          this.signupError = 'A megadott jelszó túl gyenge. Legalább 6 karakter hosszúnak kell lennie!';
          break;
        default:
          this.signupError = 'Hiba történt. Kérlek próbáld újra később.';
      }
    });
  }

 
}
