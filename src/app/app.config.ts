import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {getAuth, provideAuth} from "@angular/fire/auth";
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {provideState, provideStore} from '@ngrx/store';
import {TaskReducer} from "./store/reducers/Task.Reducer";
import {provideEffects} from "@ngrx/effects";
import {TaskEffects} from "./store/effects/task.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStore(),
    provideState(TaskReducer),
    provideEffects(TaskEffects)
]
};
