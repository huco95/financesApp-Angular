import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Category } from 'src/app/models/moves/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategoriesByType(type: string): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.api_base + '/categories/' + type);
  }
}
