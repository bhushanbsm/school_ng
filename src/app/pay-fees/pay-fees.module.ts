import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ; 
import { PayFeesComponent } from './pay-fees.component';
import { PayFeesRoutingModule } from './pay-fees-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReceiptModalComponent } from '../receipt-modal/modal.component';


@NgModule({
  declarations: [PayFeesComponent,ReceiptModalComponent],
  imports: [
    CommonModule,
    PayFeesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ]
})
export class PayFeesModule { }
