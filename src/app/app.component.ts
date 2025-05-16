import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MenuComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'szegedimenetrendapp';
  

  userLoggedIn : boolean = localStorage.getItem('isLoggedIn') === 'true';
  private authSubscription?: Subscription;

  constructor(private router:Router, private authService:AuthService){

  }
  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser.subscribe( user => {
      this.userLoggedIn = !!user;
      localStorage.setItem('isLoggedIn', this.userLoggedIn ? 'true' : 'false');
    }
    );
  }


  moveTo(page:string):void{
    this.router.navigateByUrl("/"+page);
  }

  onToggleSidenav(sidenav:MatSidenav){
    sidenav.open();
  }

  logout():void{
    this.authService.signOut().then(_ => {
      window.location.reload();
    });
    
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

}
