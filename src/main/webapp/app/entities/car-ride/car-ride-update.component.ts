import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ICarRide, CarRide } from 'app/shared/model/car-ride.model';
import { CarRideService } from './car-ride.service';
import { IDriver } from 'app/shared/model/driver.model';
import { DriverService } from 'app/entities/driver/driver.service';
import { ICar } from 'app/shared/model/car.model';
import { CarService } from 'app/entities/car/car.service';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from 'app/entities/taxi-office/taxi-office.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

type SelectableEntity = IDriver | ICar | ITaxiOffice | ICustomer;

@Component({
  selector: 'jhi-car-ride-update',
  templateUrl: './car-ride-update.component.html'
})
export class CarRideUpdateComponent implements OnInit {
  isSaving = false;

  drivers: IDriver[] = [];

  cars: ICar[] = [];

  taxioffices: ITaxiOffice[] = [];

  customers: ICustomer[] = [];
  startTimeDp: any;

  editForm = this.fb.group({
    id: [],
    startTime: [],
    duration: [],
    distance: [],
    endPlace: [],
    startPlace: [],
    cost: [],
    driver: [],
    car: [],
    taxiOffice: [],
    customer: []
  });

  constructor(
    protected carRideService: CarRideService,
    protected driverService: DriverService,
    protected carService: CarService,
    protected taxiOfficeService: TaxiOfficeService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carRide }) => {
      this.updateForm(carRide);

      this.driverService
        .query({ filter: 'carride-is-null' })
        .pipe(
          map((res: HttpResponse<IDriver[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IDriver[]) => {
          if (!carRide.driver || !carRide.driver.id) {
            this.drivers = resBody;
          } else {
            this.driverService
              .find(carRide.driver.id)
              .pipe(
                map((subRes: HttpResponse<IDriver>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDriver[]) => {
                this.drivers = concatRes;
              });
          }
        });

      this.carService
        .query({ filter: 'carride-is-null' })
        .pipe(
          map((res: HttpResponse<ICar[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICar[]) => {
          if (!carRide.car || !carRide.car.id) {
            this.cars = resBody;
          } else {
            this.carService
              .find(carRide.car.id)
              .pipe(
                map((subRes: HttpResponse<ICar>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICar[]) => {
                this.cars = concatRes;
              });
          }
        });

      this.taxiOfficeService
        .query()
        .pipe(
          map((res: HttpResponse<ITaxiOffice[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITaxiOffice[]) => (this.taxioffices = resBody));

      this.customerService
        .query()
        .pipe(
          map((res: HttpResponse<ICustomer[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICustomer[]) => (this.customers = resBody));
    });
  }

  updateForm(carRide: ICarRide): void {
    this.editForm.patchValue({
      id: carRide.id,
      startTime: carRide.startTime,
      duration: carRide.duration,
      distance: carRide.distance,
      endPlace: carRide.endPlace,
      startPlace: carRide.startPlace,
      cost: carRide.cost,
      driver: carRide.driver,
      car: carRide.car,
      taxiOffice: carRide.taxiOffice,
      customer: carRide.customer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carRide = this.createFromForm();
    if (carRide.id !== undefined) {
      this.subscribeToSaveResponse(this.carRideService.update(carRide));
    } else {
      this.subscribeToSaveResponse(this.carRideService.create(carRide));
    }
  }

  private createFromForm(): ICarRide {
    return {
      ...new CarRide(),
      id: this.editForm.get(['id'])!.value,
      startTime: this.editForm.get(['startTime'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      distance: this.editForm.get(['distance'])!.value,
      endPlace: this.editForm.get(['endPlace'])!.value,
      startPlace: this.editForm.get(['startPlace'])!.value,
      cost: this.editForm.get(['cost'])!.value,
      driver: this.editForm.get(['driver'])!.value,
      car: this.editForm.get(['car'])!.value,
      taxiOffice: this.editForm.get(['taxiOffice'])!.value,
      customer: this.editForm.get(['customer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarRide>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
