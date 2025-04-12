import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  @Input() sidenav!: MatSidenav;
  @Input() userLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  
  ngOnInit(): void {
    this.userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(){
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/home';
    this.closeMenu();
  }

  closeMenu(){
    if(this.sidenav){
      this.sidenav.close();
    }
  }
}
