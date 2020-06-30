import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AccountService } from "../shared/services/account.service";
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    loading = false;
    submitted = false;
    form: FormGroup;

    constructor(public router: Router, private route: ActivatedRoute, private accountService: AccountService, private formBuilder: FormBuilder, public toastService: ToastService) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

        const user = this.accountService.userValue;
        if (user) {
            this.router.navigate([this.returnUrl]);
        }

        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });  
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onLoggedin() {this.router.navigate([this.returnUrl]);
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    
                    if (data.status == 200) {
                        this.toastService.show('Logged in successfully', { classname: 'bg-success text-light ', delay: 3000 });
                        
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.loading = false;
                        Object.keys(data.error).forEach(key => {
                            this.toastService.show(data.error[key], { classname: 'bg-danger text-light ', delay: 3000 });
                          })
                    }    
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
}
