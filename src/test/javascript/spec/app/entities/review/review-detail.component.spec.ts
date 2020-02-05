import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UberTwoTestModule } from '../../../test.module';
import { ReviewDetailComponent } from 'app/entities/review/review-detail.component';
import { Review } from 'app/shared/model/review.model';

describe('Component Tests', () => {
  describe('Review Management Detail Component', () => {
    let comp: ReviewDetailComponent;
    let fixture: ComponentFixture<ReviewDetailComponent>;
    const route = ({ data: of({ review: new Review(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UberTwoTestModule],
        declarations: [ReviewDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReviewDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReviewDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load review on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.review).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});