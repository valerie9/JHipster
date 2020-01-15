import { Moment } from 'moment';
import { ICarRide } from 'app/shared/model/car-ride.model';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';

export interface ICustomer {
  id?: number;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: Moment;
  carRides?: ICarRide[];
  taxiOffice?: ITaxiOffice;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public name?: string,
    public phoneNumber?: string,
    public dateOfBirth?: Moment,
    public carRides?: ICarRide[],
    public taxiOffice?: ITaxiOffice
  ) {}
}
