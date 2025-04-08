import { Component, OnInit } from '@angular/core';
import { Routes } from '../../../../assets/constants/routes';
import { Route } from '../../../shared/interfaces/route';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Trips } from '../../../../assets/constants/trips';
import { StopTimes } from '../../../../assets/constants/stop_times';
import { Trip } from '../../../shared/interfaces/trip';
import { Stop } from '../../../shared/interfaces/stop';
import { StopTime } from '../../../shared/interfaces/stop_time';
import { Stops } from '../../../../assets/constants/stops';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss'
})
export class BusComponent implements OnInit{

  bus!: Route | undefined;
  tripsForBus!: Trip[];
  stopTimes!: StopTime[];
  stopIds!: number[];
  //stopsForBus!: Stop[];
  stopsForBus: Map<number, Stop> = new Map<number, Stop>();

  constructor(private route:ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
   /* this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.bus = Routes.find(b => b.route_short_name === id);
      this.tripsForBus = Trips.filter(trip => trip.route_id === this.bus?.route_id);
      this.stopTimes = StopTimes.filter(st => st.trip_id === this.tripsForBus[0].trip_id);
      for(let stopTime of this.stopTimes){
        const stop = Stops.find(s => s.stop_id === stopTime.stop_id);
        if(stop){
          this.stopsForBus.set(stopTime.stop_sequence, stop);
        }
      }

     /* this.stopIds = this.stopTimes.map(stop => stop.stop_id);
      this.stopsForBus[] = Stops.filter(stop => this.stopIds.includes(stop.stop_id));
      
    })
    */
    
  }

  reverse():void{
    /*dd
    const entries = Array.from(this.stopsForBus.entries());

  const reversed = entries.reverse();

  const temp: Map<number, Stop> = new Map(reversed);
  this.stopsForBus = temp;
  */
  }

  back():void {
    this.router.navigateByUrl('/buses');
  }
}
