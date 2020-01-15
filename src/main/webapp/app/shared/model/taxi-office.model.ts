import { ICar } from 'app/shared/model/car.model';
import { IDriver } from 'app/shared/model/driver.model';
import { ICarRide } from 'app/shared/model/car-ride.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface ITaxiOffice {
  id?: number;
  town?: string;
  cars?: ICar[];
  drivers?: IDriver[];
  carRides?: ICarRide[];
  customers?: ICustomer[];
}

export class TaxiOffice implements ITaxiOffice {
  constructor(
    public id?: number,
    public town?: string,
    public cars?: ICar[],
    public drivers?: IDriver[],
    public carRides?: ICarRide[],
    public customers?: ICustomer[]
  ) {}
}
