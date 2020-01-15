import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { ICustomer, Customer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from 'app/entities/taxi-office/taxi-office.service';

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {
  isSaving = false;

  taxioffices: ITaxiOffice[] = [];
  dateOfBirthDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    phoneNumber: [],
    dateOfBirth: [],
    taxiOffice: []
  });

  constructor(
    protected customerService: CustomerService,
    protected taxiOfficeService: TaxiOfficeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);

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

  updateForm(customer: ICustomer): void {
    this.editForm.patchValue({
      id: customer.id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      dateOfBirth: customer.dateOfBirth,
      taxiOffice: customer.taxiOffice
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value,
      taxiOffice: this.editForm.get(['taxiOffice'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>): void {
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
