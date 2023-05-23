import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { LoginComponent } from './components/login/login.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuthGuard } from './okta-auth.guard';

const routes: Routes = [
  { path: 'arf-compare', component: AppShellComponent, canActivate: [OktaAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login/callback', component: OktaCallbackComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
