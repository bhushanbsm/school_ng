import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 2000"
      (hide)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M10.872 6.831l1.695 3.904 3.654-1.561-1.79 3.426 3.333.954-3.417 1.338 2.231 4.196-4.773-2.582-2.869 2.287.413-3.004-3.792-.726 2.93-1.74-1.885-2.512 3.427.646.843-4.626zm-.786-6.831l-1.665 9.119-6.512-1.228 3.639 4.851-5.548 3.294 7.108 1.361-.834 6.076 5.742-4.577 9.438 5.104-4.288-8.064 6.834-2.677-6.661-1.907 3.25-6.22-6.98 2.982-3.523-8.114z"></path></svg>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'},
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  ngOnInit(): void {
  }

}
