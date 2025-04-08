export interface StopTime{
    trip_id: string;
    arrival_time: string;
    departure_time: string;
    stop_id: number;
    stop_sequence: number;
    pickup_type: number;
    drop_off_type: number;
}

/*
"trip_id": "275/0",
   "arrival_time": "04:25:00",
   "departure_time": "04:25:00",
   "stop_id": 2429618976,
   "stop_sequence": 1,
   "pickup_type": 0,
   "drop_off_type": 1,
*/