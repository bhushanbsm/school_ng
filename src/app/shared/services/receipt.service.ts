import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor() { }

  id: any[] = null;

  show(id) {
    this.id = id;
  }

  remove(toast) {
    this.id = null;
  }
}
