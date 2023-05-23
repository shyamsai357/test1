import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import { OktaAuthService } from '@okta/okta-angular'

@Injectable({
    providedIn: 'root'
})

export class OktaAuthGuard implements CanActivate {
    
    constructor(private oktaAuth: OktaAuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>  {
        return this.oktaAuth.isAuthenticated().then((authenticated: boolean) => {
        if(authenticated){
            return true;
        }
        else{
            this.oktaAuth.signInWithRedirect({
                originalUri: state.url
            });
            return false
        }});
    }
}