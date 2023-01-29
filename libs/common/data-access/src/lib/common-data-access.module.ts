import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { INITIAL_OPTIONS, StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { CustomRouteSerializer } from './ngrx/custom-route-serializer';
import { StorageService } from './storage/storage.service';

interface Config {
  storage: Type<StorageService>;
  storeDevtoolsOptions: StoreDevtoolsOptions;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomRouteSerializer }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorInterceptor,
    },
  ],
})
export class CommonDataAccessModule {
  static forRoot(config: Config): ModuleWithProviders<CommonDataAccessModule> {
    return {
      ngModule: CommonDataAccessModule,
      providers: [
        {
          provide: INITIAL_OPTIONS,
          useValue: config.storeDevtoolsOptions,
        },
        {
          provide: StorageService,
          useClass: config.storage,
        },
      ],
    };
  }
}
