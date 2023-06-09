// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    environmentName: '[Stage: DEV]',
    flask_api_url: 'http://localhost:5000/sunrise-flask-app/api/common-payload',
    okta: {
      baseUrl: 'https://dev-61504099.okta.com',
      clientId: '0oa8s3rtkcWGoia4T5d7',
      redirectUri: 'http://localhost:4200/login/callback',
      issuer: 'https://dev-61504099.okta.com/oauth2/default',
    },
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  