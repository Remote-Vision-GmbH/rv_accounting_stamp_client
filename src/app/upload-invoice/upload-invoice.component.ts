import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import {AccountingService} from "../services/accounting.service";

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrl: './upload-invoice.component.scss'
})
export class UploadInvoiceComponent {

/*  pdfSrc = 'http://localhost:3000/public/uploads/20240103_10000200000127379011.pdf'*/
  formData: FormData;
  currentZoom = 1;

  pdfSrc: string = '';
  selectedFile: File | null = null;
  filename: string;

  constructor(

    private accountingService: AccountingService,
    private http: HttpClient
  ) {
    this.formData = new FormData();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post<{name: string}>('http://localhost:3000/upload', formData, {
      headers: {
        'Accept': 'application/json',
      },
      responseType: 'json',
    })
      .subscribe({
        next: (response) => {
          this.filename = response.name;
          this.pdfSrc = `http://localhost:3000/file/${this.filename}`;
        },
        error: (error) => console.error(error)
      });
  }

  zoomFile() {
    if(this.currentZoom === 1.75)  {
      this.currentZoom = 1
    } else {
      this.currentZoom = 1.75
    }
  }



}
