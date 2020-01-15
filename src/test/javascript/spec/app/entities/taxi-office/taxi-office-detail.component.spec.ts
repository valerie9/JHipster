import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UberTwoTestModule } from '../../../test.module';
import { TaxiOfficeDetailComponent } from 'app/entities/taxi-office/taxi-office-detail.component';
import { TaxiOffice } from 'app/shared/model/taxi-office.model';

describe('Component Tests', () => {
  describe('TaxiOffice Management Detail Component', () => {
    let comp: TaxiOfficeDetailComponent;
    let fixture: ComponentFixture<TaxiOfficeDetailComponent>;
    const route = ({ data: of({ taxiOffice: new TaxiOffice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [TaxiOfficeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TaxiOfficeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaxiOfficeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load taxiOffice on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.taxiOffice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
