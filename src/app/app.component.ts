import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
export class AppComponent implements OnChanges{
  title = 'SzegediMenetrendApp';


  userLoggedIn : boolean = localStorage.getItem('isLoggedIn') === 'true';
  constructor(private router:Router){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  moveTo(path:String){
    if(path !== "logout"){
      this.router.navigateByUrl("/"+path);
    } else {
      localStorage.removeItem('isLoggedIn');
      this.userLoggedIn = false;
    }
  }

  onToggleSidenav(sidenav:MatSidenav){
    sidenav.open();
  }

}
