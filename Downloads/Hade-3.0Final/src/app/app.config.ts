import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firebaseProviders } from './firebase.config';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

const NO_NG_MODULES = importProvidersFrom([BrowserAnimationsModule]);


export const appConfig: ApplicationConfig = {
 // providers: [provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"hade-aec36","appId":"1:420788794007:web:64590c6836adfa0340efd2","databaseURL":"https://hade-aec36-default-rtdb.firebaseio.com","storageBucket":"hade-aec36.appspot.com","apiKey":"AIzaSyAgXkoZkmfkvhI7IAOSOClsOW8toxBjP9A","authDomain":"hade-aec36.firebaseapp.com","messagingSenderId":"420788794007","measurementId":"G-TFSFS3RH64"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
 providers: [
    provideRouter(routes),
    firebaseProviders,
    NO_NG_MODULES,
    {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: {
            appearance: 'outline',
            color: 'accent',
        },
    },
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
