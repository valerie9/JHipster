import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarRide } from 'app/shared/model/car-ride.model';

@Component({
  selector: 'jhi-car-ride-detail',
  templateUrl: './car-ride-detail.component.html'
})
export class CarRideDetailComponent implements OnInit {
  carRide: ICarRide | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carRide }) => {
      this.carRide = carRide;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
