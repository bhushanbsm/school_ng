import { Component, OnInit, ChangeDetectorRef, Injectable, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiServeService } from '../shared/services/apiserve.service';
import { ToastService } from '../shared/services/toast.service';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReceiptService } from '../shared/services/receipt.service';
import { AccountService } from "../shared/services/account.service";

@Component({
  selector: 'app-pay-fees',
  templateUrl: './pay-fees.component.html',
  styleUrls: ['./pay-fees.component.css'],
  animations: [routerTransition()]
})
export class PayFeesComponent implements OnInit {
  @ViewChild('content') content;
  elRef: ElementRef;
  closeResult: string;

  receipt = [];
  userName;
  particulars;
  totalAmount = 0;
  classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  sessions = [
    { id: 1, name: '2020-2021' }
  ];
  feeHeads = [
    { id: 1, name: 'Admission', field: 'admission' },
    { id: 2, name: 'Exam', field: 'exam' },
    { id: 3, name: 'Computer', field: 'computer' },
    { id: 4, name: 'E-class', field: 'e_class' },
    { id: 5, name: 'Other', field: 'other' },
    { id: 6, name: 'Late Fees', field: 'late' },
  ];
  prevFeeHead = [];
  months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];
  id: string;
  students;

  feesForm = this.fb.group({
    session: [1, Validators.required],
    class: [null, Validators.required],
    student: [null, Validators.required],
    feeHead: [null, Validators.required],
    admission: ['', Validators.pattern("[0-9]*")],
    feesFrom: [null],
    feesTo: [null],
    exam: ['', Validators.pattern("[0-9]*")],
    computer: ['', Validators.pattern("[0-9]*")],
    e_class: ['', Validators.pattern("[0-9]*")],
    other: ['', Validators.pattern("[0-9]*")],
    late: ['', Validators.pattern("[0-9]*")],
  });

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cd: ChangeDetectorRef, private apiServeService: ApiServeService, public toastService: ToastService, private modalService: NgbModal, elRef: ElementRef, public accountService: AccountService, config: NgbModalConfig) {
    this.elRef = elRef;
    config.size = 'lg';
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get('id');
    //   this.apiServeService.getStudent(this.id).subscribe((data) => {
    //     if (data.status == 200) {
    //       this.feesForm.patchValue({
    //         session: parseInt(data.data.student.session), 
    //         class: data.data.student.class 
    //       });
    //     } else {
    //       Object.keys(data.error).forEach(key => {
    //         this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
    //       })
    //     }
    //   })
    // });
    const user = this.accountService.userValue;
    this.userName = user.fname + ' ' + user.lname;
    this.apiServeService.getParticulars().subscribe((data) => {
      if (data.status == 200) {
        this.particulars = data.data[0];
      } else {
        this.toastService.show('Unable to Connect to server', { classname: 'bg-danger text-light ', delay: 3000 });
      }
    })
  }

  // convenience getter for easy access to form fields
  get sc() { return this.feesForm.controls; }

  showFeild(type) {
    if (this.sc.feeHead.value === [] || this.sc.feeHead.value == '' || this.sc.feeHead.value === null) {
      return false;
    }
    return this.sc.feeHead.value.includes(type);
  }

  setValues() {
    Object.entries(this.feeHeads).forEach(
      ([key, value]: any[]) => {
        let amount = 0;
        if ((this.sc.feeHead.value !== [] && this.sc.feeHead.value != '' && this.sc.feeHead.value !== null) && this.sc.feeHead.value.includes(value.id)) {
          if (this.prevFeeHead === [] || !this.prevFeeHead.includes(value.id)) {
            amount = this.particulars[value.field];
            if (value.id == 1 || value.id == 6) {
              amount = 0;
            }
          } else {
            amount = this.sc[value.field].value;
          }
        } else {
          amount = 0;
        }
        this.feesForm.get(value.field).setValue(amount);
      }
    )
    this.prevFeeHead = this.sc.feeHead.value;
  }

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

  showFeesHead() {
    if (this.sc.student.value == '' || this.sc.student.value == null) {
      return false;
    }
    return true;
  }

  showFeeHeadAmount() {
    if (this.sc.feeHead.value === [] || this.sc.feeHead.value == '' || this.sc.feeHead.value === null) {
      return false;
    }
    return true;
  }

  calculateAdmissionAmount() {
    if (this.sc.feesFrom.value == '' || this.sc.feesFrom.value === null || this.sc.feesTo.value == '' || this.sc.feesTo.value === null) {
      this.feesForm.get('admission').setValue(0);
      return false;
    }
    if (this.sc.feesFrom.value >= this.sc.feesTo.value) {
      this.feesForm.get('admission').setValue(0);
      return false;
    }

    let totalMonths = (this.sc.feesTo.value - this.sc.feesFrom.value) + 1;
    let perMonthAmount = this.particulars.admission / 12;
    this.feesForm.get('admission').setValue(perMonthAmount * totalMonths);
    return true;
  }

  calculateTotalAmount() {
    let admission = this.sc.admission.value ? parseInt(this.sc.admission.value) : 0;
    let exam = this.sc.exam.value ? parseInt(this.sc.exam.value) : 0;
    let computer = this.sc.computer.value ? parseInt(this.sc.computer.value) : 0;
    let e_class = this.sc.e_class.value ? parseInt(this.sc.e_class.value) : 0;
    let other = this.sc.other.value ? parseInt(this.sc.other.value) : 0;
    let late = this.sc.late.value ? parseInt(this.sc.late.value) : 0;
    this.totalAmount = admission + exam + computer + e_class + other + late;
    return this.totalAmount;
  }

  getStudents() {
    if (this.sc.class.value == '' || this.sc.class.value == null) {
      return false;
    }
    let data = { session: this.sc.session.value, class: this.sc.class.value };
    this.apiServeService.getStudents(data).subscribe((resp) => {
      if (resp.status == 200) {
        if (resp.data.count == null) {
          this.toastService.show('No Students found', { classname: 'bg-danger text-light ', delay: 3000 });
        } else {
          this.students = resp.data.students;
        }
      } else {
        this.toastService.show(resp.error, { classname: 'bg-danger text-light ', delay: 3000 });
      }
    })
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.feesForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )
    this.apiServeService.payFees(formData).subscribe((data) => {
      if (data.status == 200) {
        this.feesForm.reset();
        this.feesForm.get('session').setValue(1);
        this.prevFeeHead = [];
        this.receipt = data.data.receipt;
        this.toastService.show('Fees paid successfully', { classname: 'bg-success text-light ', delay: 3000 });
        this.open(this.content);
      } else {
        Object.keys(data.error).forEach(key => {
          this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
        })
      }
    })
  }

  open(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContents);
    WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">');
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
