import {Component, OnInit} from '@angular/core';
import {AccountingService} from "../../services/accounting.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SaveAndStampComponent} from "../../shared/save-and-stamp/save-and-stamp.component";

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  public accountingForm: FormGroup = this.createForm();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog

  ) {
  }
  createForm() {
    return this.fb.group({
      invoice: [''],
      accountings: this.fb.array([])
    })
  }

  get accountings() {
    return this.accountingForm.get('accountings') as FormArray
  }

  getAccountings() {
    return (this.accountingForm.get('accountings') as FormArray).controls;
  }

  private createAccounting(): FormGroup {
    return this.fb.group({
      soll: '',
      haben: '',
      amount: '',
      tax: '',
    })
  }

  addAccounting() {
    this.accountings.push(this.createAccounting())
  }

  deleteAccounting(id: number) {
    this.accountings.removeAt(id);
  }

  submitAccounting() {
    console.log(this.accountingForm)
  }
  saveAndLoad(accountingForm:FormGroup) {
    this.dialog.open(SaveAndStampComponent, {
      data: {accountingForm},
      width: '300px',
      height: '300px'
    })
  }
}
