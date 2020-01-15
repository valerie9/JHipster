import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITaxiOffice, TaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from './taxi-office.service';

@Component({
  selector: 'jhi-taxi-office-update',
  templateUrl: './taxi-office-update.component.html'
})
export class TaxiOfficeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    town: []
  });

  constructor(protected taxiOfficeService: TaxiOfficeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taxiOffice }) => {
      this.updateForm(taxiOffice);
    });
  }

  updateForm(taxiOffice: ITaxiOffice): void {
    this.editForm.patchValue({
      id: taxiOffice.id,
      town: taxiOffice.town
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const taxiOffice = this.createFromForm();
    if (taxiOffice.id !== undefined) {
      this.subscribeToSaveResponse(this.taxiOfficeService.update(taxiOffice));
    } else {
      this.subscribeToSaveResponse(this.taxiOfficeService.create(taxiOffice));
    }
  }

  private createFromForm(): ITaxiOffice {
    return {
      ...new TaxiOffice(),
      id: this.editForm.get(['id'])!.value,
      town: this.editForm.get(['town'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaxiOffice>>): void {
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
}
