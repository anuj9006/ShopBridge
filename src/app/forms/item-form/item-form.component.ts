import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.sass']
})
export class ItemFormComponent implements OnInit {
  currencyList: String[];
  public isEdit: Boolean = false;
  public itemForm: FormGroup = this.fb.group({
    name: ['', [Validators.pattern(ALPHA_NUMERIC_REGEX)] ],
    description: ['', Validators.required ],
    price: ['', Validators.required ],
    currency: ['', Validators.required ]
 });
  @Input() heading: String;
  constructor(
      private itemsService: ItemsService,
      private fb: FormBuilder,
      public activeModal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.currencyList = this.itemsService.getCurrencies();
  }

  onSubmit() {
    const item: Item = {
      name:this.itemForm.controls['name'].value.trim(),
      description: this.itemForm.controls['description'].value.trim(),
      price: this.itemForm.controls['price'].value,
      currency: this.itemForm.controls['currency'].value
    }
    this.isEdit ? this.itemsService.editItem(item) : this.itemsService.addItem(item);
    this.itemForm.reset();
    this.activeModal.close();
  }
}
