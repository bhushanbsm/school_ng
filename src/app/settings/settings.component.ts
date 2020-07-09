import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiServeService } from '../shared/services/apiserve.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {
  editActive = null;
  particulars: any[] = [];
  particularsForm;
  sessions = [
    { id: 1, name: '2020-2021' }
  ];
  // particularsForm = this.fb.group({
  //   session: [1, Validators.required],
  //   admission: ['', [Validators.required,Validators.pattern("[0-9]*")]],
  //   exam: ['', [Validators.required,Validators.pattern("[0-9]*")]],
  //   computer: ['', [Validators.required,Validators.pattern("[0-9]*")]],
  //   e_class: ['', [Validators.required,Validators.pattern("[0-9]*")]],
  //   other: ['', [Validators.required,Validators.pattern("[0-9]*")]]
  // });
  constructor(private fb: FormBuilder, private apiServeService: ApiServeService, public toastService: ToastService) {
  }

  ngOnInit() {
    this.apiServeService.getParticulars().subscribe((data) => {
      if (data.status == 200) {
        this.particulars = data.data;
      } else {
        this.toastService.show('Unable to Connect to server', { classname: 'bg-danger text-light ', delay: 3000 });
      }
    })
  }

  setValues(i) {
    this.editActive = i;
    this.particularsForm = {
      session:1,
      admission:this.particulars[i].admission,
      exam:this.particulars[i].exam,
      computer:this.particulars[i].computer,
      e_class:this.particulars[i].e_class,
      other:this.particulars[i].other,
    };
  }

  update() {
    this.apiServeService.updateParticulars(this.particularsForm).subscribe((data) => {
      if (data.status == 200) {
        this.editActive = null;
        this.particularsForm = {};
        this.ngOnInit();
        this.toastService.show('Fees particulars updated successfully', { classname: 'bg-success text-light ', delay: 3000 });
      } else {
        Object.keys(data.error).forEach(key => {
          this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
        })
      }
    },
    (data) => this.toastService.show('Network Error', { classname: 'bg-danger text-light ', delay: 3000 }))
  }

}
