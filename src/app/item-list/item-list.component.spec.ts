import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ErrorService } from '../services/error.service';
import { ItemsService } from '../services/items.service';

import { ItemListComponent } from './item-list.component';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let http: HttpClient;
  let item: Item = {
    name: 'Test1',
    description: 'test desc',
    price: 20,
    currency: 'INR'
  };
  let itemsService: ItemsService;
  let errorService: ErrorService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      providers: [HttpClient, HttpHandler, FormBuilder, NgbActiveModal, ItemsService, ErrorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    itemsService = TestBed.inject(ItemsService);
    http = TestBed.inject(HttpClient);
    errorService = TestBed.inject(ErrorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit item form', () => {
    expect(component).toBeTruthy();
    component.editItem(item);
    expect(component.modalRef).toBeDefined();
  });

  it('should edit item', () => {
    spyOn(http, 'put').and.returnValue(ObservableOf({}));
    spyOn(itemsService, 'editItem').and.callThrough();
    itemsService.editItem(item);
    expect(http.put).toHaveBeenCalled();
  });

  it('should delete item', () => {
    spyOn(http, 'delete').and.returnValue(ObservableOf({}));
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(itemsService, 'deleteItem').and.callThrough();
    component.deleteItem(item);
    expect(http.delete).toHaveBeenCalled();
  });

  it('should not delete item if user denies', () => {
    spyOn(http, 'delete').and.returnValue(ObservableOf({}));
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(itemsService, 'deleteItem').and.callThrough();
    component.deleteItem(item);
    expect(http.delete).not.toHaveBeenCalled();
  });
  it('should show error if edit fails', () => {
    spyOn(errorService, 'showError');
    spyOn(http, 'put').and.returnValue(Observable.create(observer => {
      observer.error({
        error: {
          message: 'test message'
        }
      })
    }));
    spyOn(itemsService, 'editItem').and.callThrough();
    itemsService.editItem(item);
    expect(errorService.showError).toHaveBeenCalled();
  });

  it('should show error if delete', () => {
    spyOn(errorService, 'showError');
    spyOn(http, 'delete').and.returnValue(Observable.create(observer => {
      observer.error({
        error: {
          message: 'test message'
        }
      })
    }));
    spyOn(itemsService, 'deleteItem').and.callThrough();
    itemsService.deleteItem(item);
    expect(errorService.showError).toHaveBeenCalled();
  });
});

function ObservableOf(value?): Observable<any> {
  return new Observable((observer) => {
    observer.next(value);
    observer.complete();
  });
}