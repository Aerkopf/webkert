import { Component } from '@angular/core';
import { Routes } from '../../../assets/constants/routes';
import { Route } from '../../shared/interfaces/route';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PublicTransportStorageService } from '../../shared/services/public-transport-storage.service';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.scss'
})
export class SavedComponent {
  savedTransport: Route[] = [];
  firstCall: boolean = true;

  constructor(private router:Router, private publicTransportService: PublicTransportStorageService){
    this.savedTransport = publicTransportService.getSavedTransport();
  }

  moveTo(id:string):void{
    let vehicle = Routes.find(v => v.route_short_name === id);
    if(vehicle){
      if(vehicle.route_type === 3 || vehicle.route_type === 11){
        window.location.href = '/buses/bus/'+id;
      } else if (vehicle.route_type === 0 || vehicle.route_type === 109){
        window.location.href = '/trams/tram/'+id;
      }
    }
  }

  deleteAll():void{
    this.publicTransportService.removeAll();
  }

  delete(id: number):void{
    if(id){
      this.publicTransportService.removeVehicle(id);
    }
    window.location.reload();
  }
}
