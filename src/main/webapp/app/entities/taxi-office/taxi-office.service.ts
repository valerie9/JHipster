import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITaxiOffice } from 'app/shared/model/taxi-office.model';

type EntityResponseType = HttpResponse<ITaxiOffice>;
type EntityArrayResponseType = HttpResponse<ITaxiOffice[]>;

@Injectable({ providedIn: 'root' })
export class TaxiOfficeService {
  public resourceUrl = SERVER_API_URL + 'api/taxi-offices';

  constructor(protected http: HttpClient) {}

  create(taxiOffice: ITaxiOffice): Observable<EntityResponseType> {
    return this.http.post<ITaxiOffice>(this.resourceUrl, taxiOffice, { observe: 'response' });
  }

  update(taxiOffice: ITaxiOffice): Observable<EntityResponseType> {
    return this.http.put<ITaxiOffice>(this.resourceUrl, taxiOffice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaxiOffice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaxiOffice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
