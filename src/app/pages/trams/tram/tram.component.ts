import { Component, OnInit } from '@angular/core';
import { Routes } from '../../../../assets/constants/routes';
import { Route } from '../../../shared/interfaces/route';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Trips } from '../../../../assets/constants/trips';

@Component({
  selector: 'app-tram',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './tram.component.html',
  styleUrl: './tram.component.scss'
})
export class TramComponent implements OnInit{

    bus!: Route | undefined;
  
    constructor(private route:ActivatedRoute, private router:Router){
  
    }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.bus = Routes.find(b => b.route_short_name === id);
      })
    }
  
    back():void {
      this.router.navigateByUrl('/trams');
    }
}
