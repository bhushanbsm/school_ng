import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from "../services/account.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private accountService:AccountService) {}

    canActivate() {
        const user = this.accountService.userValue;
        if (user) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
