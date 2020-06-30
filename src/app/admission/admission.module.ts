import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ; 

import { AdmissionRoutingModule } from './admission-routing.module';
import { AdmissionComponent } from './admission.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdmissionComponent],
  imports: [
    CommonModule,
    AdmissionRoutingModule, 
    PageHeaderModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
  ]
})
export class AdmissionModule { }
