import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private items: Item[];
  private model: Model<Item[]>;
  public itemsList$: Observable<Item[]>;
  constructor(
    private http: HttpClient,
    private modelFactory: ModelFactory<Array<Item>>,
    private errorService: ErrorService
  ) {
    this.model = this.modelFactory.create([]);
    this.itemsList$ = this.model.data$;
  }
  
  getItems() {
    this.http.get('http://localhost:3000/getItems').subscribe((data: Item[]) => {
      this.model.set(data);
    }, (error) => {
      this.model.set([]);
    });
  }
  getCurrencies() {
    return ['INR', 'EUR', 'GBP', 'USD', 'JPY'];
  }
  addItem(item: Item) {
    return this.http.post('http://localhost:3000/addItem', item, { headers: this.setHeaders() }).subscribe((data: Item[]) => {
      this.model.set(data)
    }, (error) => {
      this.errorService.showError(error.error);
    });
  }
  setHeaders(): import("@angular/common/http").HttpHeaders | { [header: string]: string | string[]; } {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return headers;
  }
  editItem(item: Item) {
    //this.items = this.items.filter((element: Item) => element.name !== item.name);
    return this.http.put('http://localhost:3000/items/', item).subscribe((data: Item[]) => {      
      this.model.set(data);      
    }, (error) => {
      this.errorService.showError(error.error);      
    });
  }
  deleteItem(item: Item) {
    //this.items = this.items.filter((element: Item) => element.name !== item.name);
    return this.http.delete('http://localhost:3000/items/'+ item.name).subscribe((data: Item[]) => {
      this.model.set(data);
    }, (error) => {
      this.errorService.showError(error.error);
    });
  }
}
