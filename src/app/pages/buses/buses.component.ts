import { Component, OnInit  } from '@angular/core';
import {Routes} from '../../../assets/constants/routes';
import { Route } from '../../shared/interfaces/route';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.scss'
})
export class BusesComponent implements OnInit{
  routes = Routes;
  buszok:Route[] = [];
  trolik:Route[] = [];
  called_busz:Boolean = false;
  called_troli:Boolean = false;
  

  constructor(private router:Router){
    
  }
  
  ngOnInit() : void{
    for(let r of Routes){
      if(r.route_type === 3 && r.route_desc === ""){
        this.buszok.push(r);
      } else if(r.route_type === 11 && r.route_desc === ""){
        this.trolik.push(r);
      }
    }
    this.called_busz = false;
    this.called_troli = false;
  }
  

  openBus(short_name:string, type:number){
    this.router.navigateByUrl('buses/bus/'+short_name);
    if(type === 3){
      this.called_busz = true;
      this.called_troli = false;
    } else if (type === 11){
      this.called_troli = true;
      this.called_busz = false;
    }
  }
}
