import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { routerTransition } from '../router.animations';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiServeService } from '../shared/services/apiserve.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [routerTransition()],
  providers: [DecimalPipe]
})
export class StudentsComponent implements OnInit {
  students = [];
  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sessions = [
    { id: 1, name: '2020-2021' }
  ];
  totalStudents = 0;
  totalBoys = 0;
  totalGirls = 0;
  totalTransgender = 0;
  students$: Observable<any[]>;
  filter = new FormControl('');
  pipe;

  studentsFilter = this.fb.group({
    session: [1, Validators.required],
    class: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, pipe: DecimalPipe, private apiServeService: ApiServeService, public toastService: ToastService) {
    this.pipe = pipe;
    // this.students$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.search(text, pipe))
    // );
  }

   search(text: string, pipe: PipeTransform): any[] {
    return this.students.filter(student => {
      const term = text.toLowerCase();
      return student.fname.toLowerCase().includes(term)
        || pipe.transform(student.fname).includes(term)
        || pipe.transform(student.gender).includes(term);
      //   || pipe.transform(student.gender).includes(term);
      //   || pipe.transform(student.gender).includes(term);
      //   || pipe.transform(student.gender).includes(term);
      //   || pipe.transform(student.gender).includes(term);
    });
  }

  // convenience getter for easy access to form fields
  get sc() { return this.studentsFilter.controls; }

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

  ngOnInit() { }

  // setTable(pipe: DecimalPipe) {
  //   this.students$ = this.filter.valueChanges.pipe(
  //     startWith(''),
  //     map(text => this.search(text, pipe))
  //   );
  // }

  onSubmit() {
    this.apiServeService.getStudents(this.studentsFilter.value).subscribe((resp) => {
      if (resp.status == 200) {
        if (resp.data.count == null) {
          this.toastService.show('No Students found', { classname: 'bg-danger text-light ', delay: 3000 });
        } else {
          this.students = resp.data.students;
          // console.log(this.students$);
          // this.setTable(this.pipe);
          this.totalStudents = resp.data.count.total;
          this.totalBoys = resp.data.count.male;
          this.totalGirls = resp.data.count.female;
          this.totalTransgender = resp.data.count.transgender;
        }
      } else {
        this.toastService.show(resp.error, { classname: 'bg-danger text-light ', delay: 3000 });
      }
    })
  }
}
