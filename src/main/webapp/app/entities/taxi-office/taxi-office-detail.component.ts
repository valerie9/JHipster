import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaxiOffice } from 'app/shared/model/taxi-office.model';

@Component({
  selector: 'jhi-taxi-office-detail',
  templateUrl: './taxi-office-detail.component.html'
})
export class TaxiOfficeDetailComponent implements OnInit {
  taxiOffice: ITaxiOffice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ taxiOffice }) => {
      this.taxiOffice = taxiOffice;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
