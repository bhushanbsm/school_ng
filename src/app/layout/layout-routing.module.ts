import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'students', loadChildren: () => import('../students/students.module').then((m) => m.StudentsModule) },
            { path: 'admission', loadChildren: () => import('../admission/admission.module').then((m) => m.AdmissionModule) },
            { path: 'admission/:id', loadChildren: () => import('../admission/admission.module').then((m) => m.AdmissionModule) },
            { path: 'pay-fees', loadChildren: () => import('../pay-fees/pay-fees.module').then((m) => m.PayFeesModule) },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
