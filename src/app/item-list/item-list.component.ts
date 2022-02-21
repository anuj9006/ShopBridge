import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ItemFormComponent } from '../forms/item-form/item-form.component';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  itemList$: Observable<Item[]> = this.itemsService.itemsList$;
  private modalRef: NgbModalRef;
  constructor(
      private itemsService: ItemsService,
      private modalService: NgbModal,
      private fb: FormBuilder,
      private activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    
  }
  editItem(item: Item) {
    this.modalRef = this.modalService.open(ItemFormComponent);
    this.modalRef.componentInstance.heading = "Edit Item";
    this.modalRef.componentInstance.itemForm = this.fb.group({
      name: [item.name],
      description: [item.description],
      price: [item.price],
      currency: [item.currency]
   });
   this.modalRef.componentInstance.isEdit = true;
  }
  deleteItem(item: Item) {
    const result = window.confirm("Are you sure you want to delete item - " + item.name);
    result ? this.itemsService.deleteItem(item) : '';
  }
}
