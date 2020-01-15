import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaxiOffice } from 'app/shared/model/taxi-office.model';
import { TaxiOfficeService } from './taxi-office.service';

@Component({
  templateUrl: './taxi-office-delete-dialog.component.html'
})
export class TaxiOfficeDeleteDialogComponent {
  taxiOffice?: ITaxiOffice;

  constructor(
    protected taxiOfficeService: TaxiOfficeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taxiOfficeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taxiOfficeListModification');
      this.activeModal.close();
    });
  }
}
