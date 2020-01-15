import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UberTwoTestModule } from '../../../test.module';
import { TaxiOfficeComponent } from 'app/entities/taxi-office/taxi-office.component';
import { TaxiOfficeService } from 'app/entities/taxi-office/taxi-office.service';
import { TaxiOffice } from 'app/shared/model/taxi-office.model';

describe('Component Tests', () => {
  describe('TaxiOffice Management Component', () => {
    let comp: TaxiOfficeComponent;
    let fixture: ComponentFixture<TaxiOfficeComponent>;
    let service: TaxiOfficeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [TaxiOfficeComponent],
        providers: []
      })
        .overrideTemplate(TaxiOfficeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaxiOfficeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaxiOfficeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TaxiOffice(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.taxiOffices && comp.taxiOffices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
