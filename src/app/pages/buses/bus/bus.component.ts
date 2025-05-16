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
  selector: 'app-bus',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSelectModule, TimetablePipe],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.scss'
})
export class BusComponent implements OnInit{
  userLoggedIn:boolean = false;
  bus!: Route | undefined;
  tripsForBus!: Trip[];
  stopTimes!: StopTime[];
  stopIds!: number[];
  calendar!: CalendarInterface[];
  stopsForBus: Map<number, Stop> = new Map<number, Stop>();
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
    this.findBus();
  }

  saveRoute(id:number){
    this.publicTransportService.addVehicle(id);
  }

  turn():void{
    if(this.direction === 1){
      this.direction = 0;
    } else {
      this.direction = 1;
    }
    this.findBus();
  }

  

   findBus():void {
    //kapott e az URL-ben adatot
     this.route.paramMap.subscribe(params => {
      const id = params.get('id'); //id = route_short_name
      this.calendar = Calendar.filter(c => c[this.selectedDayKey] === 1); //A nap kiválasztása után a kellő Calendar objektumok megszerzése
      const calendarServiceIds:string[] = this.calendar.map(c => c.service_id);  // A calendar változó alapján kigyűjtjük a service_id-kat;
      this.bus = Routes.find(b => b.route_short_name === id);

      let filter = Trips.filter(trip => trip.route_id === this.bus?.route_id && // Az eddigi megszorítások alapján van-e járat
        trip.direction_id == this.direction &&
        calendarServiceIds.includes(trip.service_id));

      this.tripsForBus = filter ? filter : []; 
      
      //megállók megkeresése
      if(this.tripsForBus.length > 0){
        this.stopTimes = StopTimes.filter(st => st.trip_id === this.tripsForBus[0].trip_id);
        for(let stopTime of this.stopTimes){
          const stop = Stops.find(s => s.stop_id === stopTime.stop_id);
          if(stop){
            //megállók sorrendbe rakása
            this.stopsForBus.set(stopTime.stop_sequence, stop);
          }
        }
        this.vegallomas = this.tripsForBus[0].trip_headsign;
        this.refresh();
      }
    })
  }

  refresh():void{ //meentrendi idők lekérdezése
    const stopId: number = this.selectedStop ? this.selectedStop.stop_id : -1; 
    if(stopId !== -1){
      const tripIdsForBus: string[] = this.tripsForBus.map(trip => trip.trip_id); //trip_id-k kigyűjtése

      let filter = StopTimes.filter(stopTime => 
        stopTime.stop_id === stopId && tripIdsForBus.includes(stopTime.trip_id))

      this.relevantStopTimes = filter ? filter : [];

      if(this.relevantStopTimes.length > 0){
        this.relevantStopTimes.sort((a, b) => a.arrival_time.localeCompare(b.arrival_time)); //időrendi sorrendbe helyezés
      }
    }
  }

  back():void {
    this.router.navigateByUrl('/buses');
  }
}
