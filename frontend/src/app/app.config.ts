import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {MessageService} from "./messages/message.services";
import {provideHttpClient} from "@angular/common/http";
import {AuthServices} from "./auth/auth.services";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {provide: MessageService},
    {provide: AuthServices}
  ]
};
