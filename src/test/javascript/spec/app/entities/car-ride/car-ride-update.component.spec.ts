import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UberTwoTestModule } from '../../../test.module';
import { CarRideUpdateComponent } from 'app/entities/car-ride/car-ride-update.component';
import { CarRideService } from 'app/entities/car-ride/car-ride.service';
import { CarRide } from 'app/shared/model/car-ride.model';

describe('Component Tests', () => {
  describe('CarRide Management Update Component', () => {
    let comp: CarRideUpdateComponent;
    let fixture: ComponentFixture<CarRideUpdateComponent>;
    let service: CarRideService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [CarRideUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CarRideUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CarRideUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CarRideService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CarRide(123);
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
        const entity = new CarRide();
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
