import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import OktaSignInWidget from '@okta/okta-signin-widget';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
    const oktaConfig = environment.okta;
    console.log('Okta Config: ', oktaConfig)
    const signIn = new OktaSignInWidget({
      baseUrl: oktaConfig.baseUrl,
      clientId: oktaConfig.clientId,
      redirectUri: oktaConfig.redirectUri,
      authParams: {
        issuer: oktaConfig.issuer,
        responseType: ['id_token', 'token'],
        scopes: ['openid', 'email', 'profile'],
        pkce: true
      },
      log: {
        enabled: true,
        level: 'debug',
        console: true,
      }
    });

  console.log('Sign-in Widget: ', signIn);

  console.log('Sessionget: ', signIn.authClient.session.get());
  signIn.authClient.session.get().then((session: any) => {
    console.log('Session: ', session);
      if (session.status !== 'ACTIVE'){
        signIn.renderEl(
          { el: '#sign-in-widget' },
          (res: any) => {
            console.log('Sign-in ' + res.status)
            this.router.navigate(['/arf-compare'])
          },
          (err: any) => {
            console.log('Sign-in Failed')
            console.log(err)
          }
        );
      }
      else{
        this.router.navigate(['/arf-compare']);
      }
    })
    .catch((err: any) => {
      console.error(err);
    });
  }
}