import { ICarRide } from 'app/shared/model/car-ride.model';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';

export interface ICar {
  id?: number;
  licensePlate?: string;
  name?: string;
  seats?: number;
  carRide?: ICarRide;
  taxiOffice?: ITaxiOffice;
}

export class Car implements ICar {
  constructor(
    public id?: number,
    public licensePlate?: string,
    public name?: string,
    public seats?: number,
    public carRide?: ICarRide,
    public taxiOffice?: ITaxiOffice
  ) {}
}
