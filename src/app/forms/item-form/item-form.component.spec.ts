import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { ErrorService } from 'src/app/services/error.service';
import { ItemsService } from 'src/app/services/items.service';

import { ItemFormComponent } from './item-form.component';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fb: FormBuilder;
  let itemForm: FormGroup;
  let fixture: ComponentFixture<ItemFormComponent>;
  let itemsService: ItemsService;
  let http: HttpClient;
  let item: Item = {
    name: 'Test 1',
    description: 'Test description',
    price: 50,
    currency: 'INR'
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemFormComponent],
      providers: [HttpClient, HttpHandler, FormBuilder, NgbActiveModal, ItemsService, ErrorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    itemsService = TestBed.inject(ItemsService);
    fb = TestBed.inject(FormBuilder);
    http = TestBed.inject(HttpClient);
    itemForm = fb.group({item});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item', () => {
    spyOn(itemsService, 'addItem').and.callThrough();
    spyOn(http, 'post').and.returnValue(ObservableOf({}));
    expect(component).toBeTruthy();
    component.onSubmit();
    expect(itemsService.addItem).toHaveBeenCalled();
  });

  it('should not add item if already present', () => {
    spyOn(itemsService, 'addItem').and.callThrough();
    spyOn(http, 'post').and.returnValue(Observable.create(observer => {
      observer.error({
        error: {
          message: 'test message'
        }
      })
    }));
    expect(component).toBeTruthy();
    component.onSubmit();
    expect(itemsService.addItem).toHaveBeenCalled();
  });
  it('should edit item', () => {
    spyOn(itemsService, 'editItem').and.callThrough();
    spyOn(http, 'put').and.returnValue(Observable.create(observer => {
      observer.error({
        error: {
          message: 'test message'
        }
      })
    }));
    component.isEdit = true;
    component.editItem = item;
    component.onSubmit();
    expect(itemsService.editItem).toHaveBeenCalled();
  });
});

function ObservableOf(value?): Observable<any> {
  return new Observable((observer) => {
    observer.next(value);
    observer.complete();
  });
}
