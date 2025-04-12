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
import { Calendar } from '../../../../assets/constants/calendar';
import { MatSelectModule } from '@angular/material/select';
import { TimetablePipe } from '../../../shared/pipes/timetable.pipe';
import { CalendarInterface } from '../../../shared/interfaces/calendar';
import { PublicTransportStorageService } from '../../../shared/services/public-transport-storage.service';


@Component({
  selector: 'app-tram',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSelectModule, TimetablePipe],
  templateUrl: './tram.component.html',
  styleUrl: './tram.component.scss'
})
export class TramComponent implements OnInit{
    userLoggedIn: boolean = false;
    tram!: Route | undefined;
    tripsForTram!: Trip[];
    stopTimes!: StopTime[];
    stopIds!: number[];
    calendar!: CalendarInterface[];
    stopsForTram: Map<number, Stop> = new Map<number, Stop>();
    vegallomas!: string;
    selectedStop!: Stop | undefined;
    relevantStopTimes!: StopTime[];
    direction: 0 | 1 = 1;
    days = new Map<string, string>([
      ["monday", "Hétfő"],
      ["tuesday","Kedd"],
      ["wednesday","Szerda"],
      ["thursday","Csütörtök"],
      ["friday","Péntek"],
      ["saturday","Szombat"],
      ["sunday","Vasárnap"]
    ])
    selectedDayKey: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"= "monday";
    refreshNeeded : boolean = false;
  
    constructor(private route:ActivatedRoute, private router:Router, private publicTransportService: PublicTransportStorageService){
  
    }
  
    ngOnInit(): void {
      this.userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.findTram();
    }
  
    turn():void{
      if(this.direction === 1){
        this.direction = 0;
      } else {
        this.direction = 1;
      }
      this.findTram();
    }

    saveRoute(id: number){
      this.publicTransportService.addVehicle(id);
    }
  
    
  
    findTram():void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.calendar = Calendar.filter(c => c[this.selectedDayKey] === 1);
        const calendarServiceIds:string[] = this.calendar.map(c => c.service_id);
        this.tram = Routes.find(t => t.route_short_name === id);
        this.tripsForTram = Trips.filter(trip => trip.route_id === this.tram?.route_id &&
           trip.direction_id == this.direction &&
           calendarServiceIds.includes(trip.service_id)) ? Trips.filter(trip => trip.route_id === this.tram?.route_id &&
            trip.direction_id == this.direction &&
            calendarServiceIds.includes(trip.service_id)) : [];
        
        //megállók megkeresése
        if(this.tripsForTram.length > 0){
          this.stopTimes = StopTimes.filter(st => st.trip_id === this.tripsForTram[0].trip_id);
          for(let stopTime of this.stopTimes){
            const stop = Stops.find(s => s.stop_id === stopTime.stop_id);
            if(stop){
              //megállók sorrendbe rakása
              this.stopsForTram.set(stopTime.stop_sequence, stop);
            }
          }
          let headsign = this.tripsForTram.filter(t => t.trip_headsign !== "Kocsiszínbe");
          this.vegallomas = headsign[0].trip_headsign;
          
          this.refresh();
        }
      })
    }
  
    refresh():void{
      
      const stopId: number = this.selectedStop ? this.selectedStop.stop_id : -1;
      if(stopId !== -1){
        const tripIdsForTram: string[] = this.tripsForTram.map(trip => trip.trip_id);
  
        this.relevantStopTimes = StopTimes.filter(stopTime => 
          stopTime.stop_id === stopId && tripIdsForTram.includes(stopTime.trip_id)) ? 
          StopTimes.filter(stopTime => 
            stopTime.stop_id === stopId && tripIdsForTram.includes(stopTime.trip_id)) : [];
        if(this.relevantStopTimes.length > 0){
          this.relevantStopTimes.sort((a, b) => a.arrival_time.localeCompare(b.arrival_time));
        }
      }
    }
  
    back():void {
      this.router.navigateByUrl('/trams');
    }
}
