import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AddItemComponent } from '../add-item/add-item.component';
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
      private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    
  }
  editItem(item: Item) {
    this.modalRef = this.modalService.open(ItemFormComponent);
    this.modalRef.componentInstance.heading = "Edit Item";
    this.itemsService.editItem(item);
  }
  deleteItem(item: Item) {
    this.itemsService.deleteItem(item);
  }
}
