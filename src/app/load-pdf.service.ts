import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {PDFDocument} from "pdf-lib";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadPdfService {


  constructor(private http: HttpClient) { }

  sendFile(formData: FormData): Observable<{name: string}> {
    return this.http.post<{name: string}>('http://localhost:3000/upload', formData, {
      headers: {
        'Accept': 'application/json',
      },
      responseType: 'json',
    }).pipe(catchError(this.handleError))
  }

  getPdf(filePath: string) {

  }


  getFile(filePath: string): Observable<Blob>{
    return this.http.get(filePath, {responseType: 'blob'}).pipe(catchError(this.handleError))
  }

  async addImageToPdf(pdfBuffer: ArrayBuffer, stamp: string) {
    // Load a PDFDocument from the existing PDF buffer
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Embed the image into the PDF. Assuming the image is in PNG format
    // For example, let's say you have the image as a base64 string
    const imageUrl = stamp; // Your image base64
    const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    const pngDims = image.scale(0.4)

    // Add the image to the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    // Position (x, y) and size (width, height) for the image
    firstPage.drawImage(image, {
      x: 50,
      y: 70,
      width: pngDims.width,
      height: pngDims.height
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Do something with the modified PDF (e.g., download or display it)
    // This step depends on your specific requirements
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'modified-pdf.pdf';
    link.click();

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage:string;
    if (error.status === 0) {
      errorMessage = "A client-side or network error occurred. Please try again later.";
    } else if (error.status === 404 ){
      errorMessage = "There is no invoice with this id";
    }
    else if (error.status === 400 ){
      errorMessage = "Sorry, some error happens. Please try again later";
    }
    else if (error.status === 500 ){
      errorMessage = "Server Error";
    }
    return throwError(() => ({ message: errorMessage, status: error.status }));
  }
}
