import { ICarRide } from 'app/shared/model/car-ride.model';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';

export interface IDriver {
  id?: number;
  name?: string;
  age?: string;
  salary?: number;
  carRide?: ICarRide;
  taxiOffice?: ITaxiOffice;
}

export class Driver implements IDriver {
  constructor(
    public id?: number,
    public name?: string,
    public age?: string,
    public salary?: number,
    public carRide?: ICarRide,
    public taxiOffice?: ITaxiOffice
  ) {}
}
