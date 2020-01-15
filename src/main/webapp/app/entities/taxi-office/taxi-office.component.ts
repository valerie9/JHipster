import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from './taxi-office.service';
import { TaxiOfficeDeleteDialogComponent } from './taxi-office-delete-dialog.component';

@Component({
  selector: 'jhi-taxi-office',
  templateUrl: './taxi-office.component.html'
})
export class TaxiOfficeComponent implements OnInit, OnDestroy {
  taxiOffices?: ITaxiOffice[];
  eventSubscriber?: Subscription;

  constructor(protected taxiOfficeService: TaxiOfficeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.taxiOfficeService.query().subscribe((res: HttpResponse<ITaxiOffice[]>) => {
      this.taxiOffices = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTaxiOffices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITaxiOffice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTaxiOffices(): void {
    this.eventSubscriber = this.eventManager.subscribe('taxiOfficeListModification', () => this.loadAll());
  }

  delete(taxiOffice: ITaxiOffice): void {
    const modalRef = this.modalService.open(TaxiOfficeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.taxiOffice = taxiOffice;
  }
}
