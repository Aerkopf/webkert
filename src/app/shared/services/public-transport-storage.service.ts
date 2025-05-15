import { Injectable } from '@angular/core';
import { Route } from '../interfaces/route';
import { Routes } from '../../../assets/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class PublicTransportStorageService {

  private savedTransports: Route[] = [];

  constructor() {
    const data = localStorage.getItem('savedTransports');
    this.savedTransports = data ? JSON.parse(data) : [];
   }

   getSavedTransport():Route[] {
    return this.savedTransports;
   }
   listSavedTransport():void{
    for(let item of this.savedTransports){
      console.log(item);
    }
   }

   /*
  data():void{
      if(this.firstCall){
        let busz = Routes.find(t => t.route_short_name === "60");
      let troli = Routes.find(t => t.route_short_name === "5");
      let vili = Routes.find(t => t.route_short_name === "2");
      if(busz && troli && vili){
       this.savedTransports.push(busz);
        this.savedTransports.push(troli);
        this.savedTransports.push(vili);
      }
      }
    }
      */

  addVehicle(id: number): void{
    if(id){
      let vehicle = Routes.find(r => r.route_id === id)
        if(vehicle && !this.savedTransports.includes(vehicle)){
          this.savedTransports.push(vehicle);
        }
      }
      this.refreshStorage();
    }
  

    


  removeVehicle(id: number): void{
    if(id){
      let vehicle = this.savedTransports.find(v => v.route_id === id);
      if(vehicle){
        let index = this.savedTransports.indexOf(vehicle);
        if(index !== -1){
          let temp = this.savedTransports.filter(v => v.route_id !== id);
          this.savedTransports = temp;
        }
      }
    }
    this.refreshStorage();
  }
  
  refreshStorage():void{
    localStorage.setItem('savedTransports', JSON.stringify(this.savedTransports));
  }

  removeAll():void{
    this.savedTransports = [];
    this.refreshStorage();
  }
}
