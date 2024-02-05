import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { AccountFormComponent } from './accounting/account-form/account-form.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { HttpClientModule} from "@angular/common/http";
import { FilledFormComponent } from './accounting/filled-form/filled-form.component';
import { AccountingComponent } from './accounting/accounting.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveAndStampComponent } from './shared/save-and-stamp/save-and-stamp.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    UploadInvoiceComponent,
    AccountFormComponent,
    FilledFormComponent,
    AccountingComponent,
    SaveAndStampComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
