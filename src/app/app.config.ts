import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';




export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideAnimationsAsync(),
      provideFirebaseApp(() => initializeApp({
        "projectId":"szegedimenetrendapp-98d73",
        "appId":"1:692711238592:web:227b5614eed9ce23f9b625",
        "storageBucket":"szegedimenetrendapp-98d73.firebasestorage.app",
        "apiKey":"AIzaSyBsg_4yWUFlFN3aEYbOiXUHZnAaGzJVGtw",
        "authDomain":"szegedimenetrendapp-98d73.firebaseapp.com",
        "messagingSenderId":"692711238592","measurementId":"G-DYX5YC6YPH"})),
         provideAuth(() => getAuth()),
          provideFirestore(() => getFirestore())
        ],

  
};
