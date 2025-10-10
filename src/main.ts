import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { StoreModule } from '@ngrx/store';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { VarsApp } from './app/contabil/variables';
import { appIcons } from './app/shared/constants/icons';
import { ControlService } from './app/shared/control/services/control.service';
import { registerPtBrNoDotLocale } from './app/shared/helpers/locale-pt-BR-no-dot';
import { Interceptor } from './app/shared/interceptors';
import { UserConfig } from './app/shared/models';
import { DateUtilsService, EncryptionService, HttpService } from './app/shared/services';
import { AppService } from './app/shared/services/app.service';
import { indexReducer } from './app/shared/store/index.reducer';
import { Vars } from './app/shared/variables';
import { environment } from './environments/environment';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

const providers = [{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }];

registerPtBrNoDotLocale();

//registerLocaleData(localePt, 'pt-BR');

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,
            StoreModule.forRoot({ index: indexReducer }), Interceptor),
        Title,
        provideIcons(appIcons),
        { provide: NZ_I18N, useValue: pt_BR },
        { provide: LOCALE_ID, useValue: "pt-BR" },
        Vars,
        VarsApp,
        DateUtilsService,
        UserConfig,
        EncryptionService,
        HttpService,
        AppService,
        ControlService,
        provideAnimationsAsync(),
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
        provideAnimations(),
    ]
})
    .catch((err) => console.log(err));
