import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UberTwoTestModule } from '../../../test.module';
import { TaxiOfficeUpdateComponent } from 'app/entities/taxi-office/taxi-office-update.component';
import { TaxiOfficeService } from 'app/entities/taxi-office/taxi-office.service';
import { TaxiOffice } from 'app/shared/model/taxi-office.model';

describe('Component Tests', () => {
  describe('TaxiOffice Management Update Component', () => {
    let comp: TaxiOfficeUpdateComponent;
    let fixture: ComponentFixture<TaxiOfficeUpdateComponent>;
    let service: TaxiOfficeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [TaxiOfficeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TaxiOfficeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaxiOfficeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaxiOfficeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TaxiOffice(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TaxiOffice();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
