import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.sass']
})
export class ItemFormComponent implements OnInit {
  currencyList: String[];
  itemForm: FormGroup;
  @Input() heading: String;
  constructor(
      private itemsService: ItemsService,
      private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.currencyList = this.itemsService.getCurrencies();
    this.createForm();
  }
  createForm() {
    this.itemForm = this.fb.group({
       name: ['', Validators.required ],
       description: ['', Validators.required ],
       price: ['', Validators.required ],
       currency: ['', Validators.required ]
    });
  }
  onSubmit() {
    const item: Item = {
      name:this.itemForm.controls['name'].value,
      description: this.itemForm.controls['description'].value,
      price: this.itemForm.controls['price'].value,
      currency: this.itemForm.controls['currency'].value
    }
    this.itemsService.addItem(item);
  }
}
