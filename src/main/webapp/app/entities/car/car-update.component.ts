import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICar, Car } from 'app/shared/model/car.model';
import { CarService } from './car.service';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from 'app/entities/taxi-office/taxi-office.service';

@Component({
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html'
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;

  taxioffices: ITaxiOffice[] = [];

  editForm = this.fb.group({
    id: [],
    licensePlate: [],
    name: [],
    seats: [],
    taxiOffice: []
  });

  constructor(
    protected carService: CarService,
    protected taxiOfficeService: TaxiOfficeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.updateForm(car);

      this.taxiOfficeService
        .query()
        .pipe(
          map((res: HttpResponse<ITaxiOffice[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITaxiOffice[]) => (this.taxioffices = resBody));
    });
  }

  updateForm(car: ICar): void {
    this.editForm.patchValue({
      id: car.id,
      licensePlate: car.licensePlate,
      name: car.name,
      seats: car.seats,
      taxiOffice: car.taxiOffice
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.createFromForm();
    if (car.id !== undefined) {
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));
    }
  }

  private createFromForm(): ICar {
    return {
      ...new Car(),
      id: this.editForm.get(['id'])!.value,
      licensePlate: this.editForm.get(['licensePlate'])!.value,
      name: this.editForm.get(['name'])!.value,
      seats: this.editForm.get(['seats'])!.value,
      taxiOffice: this.editForm.get(['taxiOffice'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
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

  trackById(index: number, item: ITaxiOffice): any {
    return item.id;
  }
}
