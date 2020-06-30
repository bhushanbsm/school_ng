import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ; 
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [CommonModule, StudentsRoutingModule, PageHeaderModule,ReactiveFormsModule,NgbModule,NgSelectModule],
    declarations: [StudentsComponent]
})
export class StudentsModule {}
