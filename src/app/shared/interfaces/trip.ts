export interface Trip{
    route_id: number;
    service_id: string;
    trip_id: string;
    trip_headsign: string;
    direction_id: number;
    shape_id: number;
    wheelchair_accessible: number;
}
/*
"route_id": 34,
   "service_id": "MN",
   "trip_id": "275/0",
   "trip_headsign": "Kiskundorozsma, Sziksósfürdő",
   "direction_id": 0,
   "shape_id": 3263440,
   "wheelchair_accessible": 1
*/