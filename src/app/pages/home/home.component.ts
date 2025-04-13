import { Component, OnInit } from '@angular/core';


import { Route } from '../../shared/interfaces/route';
import { MatButtonModule } from '@angular/material/button';
import { Agency } from '../../../assets/constants/agency';
import { Calendar } from '../../../assets/constants/calendar';
import { StopTimes } from '../../../assets/constants/stop_times';
import { Trips } from '../../../assets/constants/trips';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  userLoggedIn: boolean = false;

  constructor(){

  }

  ngOnInit(): void {
    this.userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  
}
