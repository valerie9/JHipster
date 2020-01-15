import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarRide } from 'app/shared/model/car-ride.model';
import { CarRideService } from './car-ride.service';

@Component({
  templateUrl: './car-ride-delete-dialog.component.html'
})
export class CarRideDeleteDialogComponent {
  carRide?: ICarRide;

  constructor(protected carRideService: CarRideService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carRideService.delete(id).subscribe(() => {
      this.eventManager.broadcast('carRideListModification');
      this.activeModal.close();
    });
  }
}
