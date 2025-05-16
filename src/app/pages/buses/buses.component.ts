import { Component, Input, OnInit, Output  } from '@angular/core';
import {Routes} from '../../../assets/constants/routes';
import { Route } from '../../shared/interfaces/route';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicTransportStorageService } from '../../shared/services/public-transport-storage.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.scss'
})
export class BusesComponent implements OnInit{

  

  userLoggedIn = false;
  routes = Routes;
  buszok:Route[] = [];
  trolik:Route[] = [];
  called_busz:Boolean = false;
  called_troli:Boolean = false;
  
  

  constructor(private router:Router, private route:ActivatedRoute, private publicTransportService: PublicTransportStorageService){
    
  }
  
  ngOnInit() : void{
    this.userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    for(let r of Routes){
      if(r.route_type === 3 && r.route_desc === ""){
        this.buszok.push(r);
      } else if(r.route_type === 11 && r.route_desc === ""){
        this.trolik.push(r);
      }
    }
    

    const child = this.route.firstChild;
    if(child){
      const id = child.snapshot.paramMap.get('id');
      const found = Routes.find(r => r.route_short_name === id);

      if(found){
        this.called_busz = found.route_type === 3;
        this.called_troli = found.route_type === 11;
      }
    }

  }

  saveRoute(id:number):void{
    if(id){
      this.publicTransportService.addVehicle(id);
    }
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
