import { Moment } from 'moment';
import { IDriver } from 'app/shared/model/driver.model';
import { ICar } from 'app/shared/model/car.model';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface ICarRide {
  id?: number;
  startTime?: Moment;
  duration?: number;
  distance?: number;
  endPlace?: string;
  startPlace?: string;
  cost?: number;
  driver?: IDriver;
  car?: ICar;
  taxiOffice?: ITaxiOffice;
  customer?: ICustomer;
}

export class CarRide implements ICarRide {
  constructor(
    public id?: number,
    public startTime?: Moment,
    public duration?: number,
    public distance?: number,
    public endPlace?: string,
    public startPlace?: string,
    public cost?: number,
    public driver?: IDriver,
    public car?: ICar,
    public taxiOffice?: ITaxiOffice,
    public customer?: ICustomer
  ) {}
}
