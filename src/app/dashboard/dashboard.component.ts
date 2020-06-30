import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ApiServeService } from '../shared/services/apiserve.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public particulars: any[] = [];

    constructor(private apiServeService: ApiServeService,public toastService: ToastService) {
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

}
