import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDriver, Driver } from 'app/shared/model/driver.model';
import { DriverService } from './driver.service';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from 'app/entities/taxi-office/taxi-office.service';

@Component({
  selector: 'jhi-driver-update',
  templateUrl: './driver-update.component.html'
})
export class DriverUpdateComponent implements OnInit {
  isSaving = false;

  taxioffices: ITaxiOffice[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    age: [],
    salary: [],
    taxiOffice: []
  });

  constructor(
    protected driverService: DriverService,
    protected taxiOfficeService: TaxiOfficeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ driver }) => {
      this.updateForm(driver);

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

  updateForm(driver: IDriver): void {
    this.editForm.patchValue({
      id: driver.id,
      name: driver.name,
      age: driver.age,
      salary: driver.salary,
      taxiOffice: driver.taxiOffice
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const driver = this.createFromForm();
    if (driver.id !== undefined) {
      this.subscribeToSaveResponse(this.driverService.update(driver));
    } else {
      this.subscribeToSaveResponse(this.driverService.create(driver));
    }
  }

  private createFromForm(): IDriver {
    return {
      ...new Driver(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      age: this.editForm.get(['age'])!.value,
      salary: this.editForm.get(['salary'])!.value,
      taxiOffice: this.editForm.get(['taxiOffice'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>): void {
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
