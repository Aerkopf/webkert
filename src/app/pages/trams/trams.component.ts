import { Component, OnInit, Output } from '@angular/core';
import {Routes} from '../../../assets/constants/routes';
import { Route } from '../../shared/interfaces/route';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trams',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './trams.component.html',
  styleUrl: './trams.component.scss'
})
export class TramsComponent implements OnInit{
  routes = Routes;
  vilik:Route[] = [];

  

  constructor(private router: Router){
    
  }
  
  ngOnInit() : void{
    for(let r of this.routes){
      if((r.route_type === 0 || r.route_type === 109) &&r.route_desc === ""){
        this.vilik.push(r);
      }
    }
  }

  openTram(index:string){
    this.router.navigateByUrl('/trams/tram/'+index);
  }

}
