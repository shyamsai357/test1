import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { OktaAuthService, OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { AppHeaderFormComponent } from './components/app-header-form/app-header-form.component';
import { LoginComponent } from './components/login/login.component';
import { environment } from '../environments/environment';

const okta = environment.okta;
const oktaConfig = {
  clientId: okta.clientId,
  issuer: okta.issuer,
  redirectUri: okta.redirectUri,
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DataFormComponent,
    AppShellComponent,
    AppHeaderFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    OktaAuthModule,
  ],
  providers: [
    OktaAuthService,
    { provide: OKTA_CONFIG, useValue: oktaConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
