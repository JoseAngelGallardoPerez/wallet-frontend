// tslint:disable:max-line-length

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MainModule } from '@app/modules/main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultAppRoutingModule } from './routers/DefaultAppRoutingModule';
import { AppComponent } from '@app/app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DefaultAppRoutingModule,
    HttpClientModule,
    MainModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
