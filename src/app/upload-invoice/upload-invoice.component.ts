import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrl: './upload-invoice.component.scss'
})
export class UploadInvoiceComponent {
  pdfSrc = 'assets/sample.pdf';
/*  pdfSrc = 'http://localhost:3000/public/uploads/20240103_10000200000127379011.pdf'*/
  formData: FormData;
  currentZoom = 1

  constructor(private  http: HttpClient) {
    this.formData = new FormData();
  }

  onFileChange(event: any) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    if(file.type !== 'application/pdf') {
      console.error('Please load a PDF file');
      return;
    }

    this.formData.append('pdf', file);
  }

  uploadFile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response' as 'response'
    };
    return this.http.post('http://localhost:3000/upload', this.formData, httpOptions)
  }

  zoomFile() {
    if(this.currentZoom === 1.75)  {
      this.currentZoom = 1
    } else {
      this.currentZoom = 1.75
    }

  }

}
