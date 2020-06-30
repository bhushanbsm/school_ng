import { Component, OnInit, ChangeDetectorRef, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiServeService } from '../shared/services/apiserve.service';
import { ToastService } from '../shared/services/toast.service';
import { NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css'],
  animations: [routerTransition()],
  providers: [NgbInputDatepickerConfig]
})
export class AdmissionComponent implements OnInit {
  id;
  type = 'add';
  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  genders = ['Male', 'Female', 'Transgender'];
  sessions = [
    { id: 1, name: '2020-2021' }
  ];
  categories = ["OBC", "SC", "ST", "NT", "SBC", "General"];
  student = this.fb.group({
    session: [1, Validators.required],
    class: [null, Validators.required],
    student_fname: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    student_mname: [null, [Validators.required]],
    student_lname: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    father_fname: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    father_mname: [null, [Validators.required]],
    father_lname: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    mother_fname: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    mother_mname: [null],
    mother_lname: [null, Validators.pattern("[a-zA-Z]*")],
    gender: [null, Validators.required],
    dob: [null, Validators.required],
    birth_place: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    nationality: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    religion: [null, [Validators.required, Validators.pattern("[a-zA-Z]*")]],
    mother_tongue: [null, Validators.pattern("[a-zA-Z]*")],
    category: [null, Validators.required],
    caste: [null, Validators.required],
    sub_caste: [null],
    aadhar: [null, [Validators.required, Validators.pattern("[0-9]{14}")]],
    mobile1: [null, Validators.pattern("[0-9]{10}")],
    mobile2: [null, Validators.pattern("[0-9]{10}")],
    per_address: [null, Validators.required],
    res_address: [null],
    photo: [null, Validators.required]
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cd: ChangeDetectorRef, private apiServeService: ApiServeService, public toastService: ToastService,config: NgbInputDatepickerConfig) {
    config.minDate = {year: 1950, month: 1, day: 1};
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id != null) {
        this.type = 'update';
        this.apiServeService.getStudent(this.id).subscribe((data) => {
          if (data.status == 200) {
            this.student.get('photo').setValidators([]);
            this.student.get('photo').updateValueAndValidity();
            this.student.patchValue({
              session: parseInt(data.data.student.session),
              class: data.data.student.class,
              student_fname:data.data.student.student_fname != 'null' ? data.data.student.student_fname : '',
              student_mname:data.data.student.student_mname != 'null' ? data.data.student.student_mname : '',
              student_lname:data.data.student.student_lname != 'null' ? data.data.student.student_lname : '',
              father_fname:data.data.student.father_fname != 'null' ? data.data.student.father_fname : '',
              father_mname:data.data.student.father_mname != 'null' ? data.data.student.father_mname : '',
              father_lname:data.data.student.father_lname != 'null' ? data.data.student.father_lname : '',
              mother_fname:data.data.student.mother_fname != 'null' ? data.data.student.mother_fname : '',
              mother_mname:data.data.student.mother_mname != 'null' ? data.data.student.mother_mname : '',
              mother_lname:data.data.student.mother_lname != 'null' ? data.data.student.mother_lname : '',
              gender:data.data.student.gender != 'null' ? data.data.student.gender : '',
              dob:data.data.student.dob != 'null' ? data.data.student.dob : '',
              birth_place:data.data.student.birth_place != 'null' ? data.data.student.birth_place : '',
              nationality:data.data.student.nationality != 'null' ? data.data.student.nationality : '',
              religion:data.data.student.religion != 'null' ? data.data.student.religion : '',
              mother_tongue:data.data.student.mother_tongue != 'null' ? data.data.student.mother_tongue : '',
              category:data.data.student.category != 'null' ? data.data.student.category : '',
              caste:data.data.student.caste != 'null' ? data.data.student.caste : '',
              sub_caste:data.data.student.sub_caste != 'null' ? data.data.student.sub_caste : '',
              aadhar:data.data.student.aadhar != 'null' ? data.data.student.aadhar : '',
              mobile1:data.data.student.mobile1 != 'null' ? data.data.student.mobile1 : '',
              mobile2:data.data.student.mobile2 != 'null' ? data.data.student.mobile2 : '',
              per_address:data.data.student.per_address != 'null' ? data.data.student.per_address : '',
              res_address:data.data.student.res_address != 'null' ? data.data.student.res_address : '',
            });
          } else {
            Object.keys(data.error).forEach(key => {
              this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
            })
          }
        })
      }
    });
  }
  
  // convenience getter for easy access to form fields
  get sc() { return this.student.controls; }

  isError(field = undefined) {
    if (field != undefined) {
      return this.sc[field].dirty && this.sc[field].errors ? 'is-invalid' : '';
    }
    return '';
  }

  isRequired(field = undefined) {
    if (field != undefined) {
      return this.sc[field].dirty && this.sc[field].errors && this.sc[field].errors.required;
    }
    return false;
  }

  isPattern(field = undefined) {
    if (field != undefined) {
      return this.sc[field].dirty && this.sc[field].errors && this.sc[field].errors.pattern;
    }
    return false;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.student.get('photo').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.student.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )
    if (this.type == 'add') {
      this.apiServeService.register(formData).subscribe((data) => {
        if (data.status == 200) {
          this.student.reset();
          this.student.get('session').setValue(1);
          this.toastService.show('Student registered successfully', { classname: 'bg-success text-light ', delay: 3000 });
        } else {
          Object.keys(data.error).forEach(key => {
            this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
          })
        }
      })
    } else {
      this.apiServeService.updateStudent(this.id,formData).subscribe((data) => {
        if (data.status == 200) {
          this.toastService.show('Student updated successfully', { classname: 'bg-success text-light ', delay: 3000 });
        } else {
          Object.keys(data.error).forEach(key => {
            this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
          })
        }
      })
    }
  }

}
