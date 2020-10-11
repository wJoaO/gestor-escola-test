import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as firebase from 'firebase/app'

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebaseConfig)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
