import { Component, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'shop-bridge';
  constructor(
    private itemService: ItemsService
  ){

  }
  ngOnInit(): void {
    this.itemService.getItems();
  }
}
