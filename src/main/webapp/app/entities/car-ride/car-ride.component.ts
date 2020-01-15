import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarRide } from 'app/shared/model/car-ride.model';
import { CarRideService } from './car-ride.service';
import { CarRideDeleteDialogComponent } from './car-ride-delete-dialog.component';

@Component({
  selector: 'jhi-car-ride',
  templateUrl: './car-ride.component.html'
})
export class CarRideComponent implements OnInit, OnDestroy {
  carRides?: ICarRide[];
  eventSubscriber?: Subscription;

  constructor(protected carRideService: CarRideService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.carRideService.query().subscribe((res: HttpResponse<ICarRide[]>) => {
      this.carRides = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCarRides();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICarRide): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCarRides(): void {
    this.eventSubscriber = this.eventManager.subscribe('carRideListModification', () => this.loadAll());
  }

  delete(carRide: ICarRide): void {
    const modalRef = this.modalService.open(CarRideDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.carRide = carRide;
  }
}
