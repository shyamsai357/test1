import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { constants } from './constants';
import { environment } from '../../../environments/environment'

export interface Email {
  email: string;
}

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  ARFselected: String = "";
  FileTypeSelected: String = ""
  delimiterSelected: String = "";
  selectedValue: string = "";
  email_list: [] = [];

  compareForm!: FormGroup;

  arfArray = constants.arfArray;
  fileTypeArray = constants.fileTypeArray;
  delimiterArray = constants.delimiterArray
  feature = constants.feature;
  emailPattern = constants.emailPattern;
  pathPattern=  constants.pathPattern;
  callerIdPattern = constants.callerIdPattern;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.submitDataForm();
  }
  submitted = false;
  get isFormValid(): boolean {
    return this.compareForm.valid && !this.submitted;
  }

  controlReadOnly = false;
  inputValue1 = "";
  inputValue2 = ""

  doSomething($event: any){
    this.inputValue1 = "";
    this.inputValue2 = "";
  }

  csvARFSelected(){
    if (this.ARFselected === 'REGULAR ARF' || this.ARFselected === 'CUSTOM ARF'){
      return true;
    }
    else {
      return false;
    }
  }

  submitDataForm() {
    this.compareForm = this.fb.group({
      source_path:['', [Validators.required, Validators.pattern(this.pathPattern)]],
      destination_path: ['', [Validators.required, Validators.pattern(this.pathPattern)]],
      source_caller_id:['', [Validators.required, Validators.pattern(this.callerIdPattern)]],
      destination_caller_id: ['', [Validators.required, Validators.pattern(this.callerIdPattern)]],
      arf_type: [this.arfArray[5], [Validators.required]],
      file_type: [this.fileTypeArray[0], [Validators.required]],
      delimiter: [''],
      primary_key:[''],
      emails_list: ['', Validators.pattern(this.emailPattern)],
    })
    this.compareForm.get('arf_type')?.valueChanges.subscribe(val => {
      if (this.ARFselected == 'OTHERS' || this.ARFselected === 'REGULAR ARF' || this.ARFselected === 'CUSTOM ARF'){
        this.compareForm.controls['file_type'].setValue(this.fileTypeArray[0]);
        this.compareForm.controls['file_type'].disabled;
      }
      if (this.ARFselected == 'OTHERS') {
        this.compareForm.controls['source_caller_id'].clearValidators();
        this.compareForm.controls['destination_caller_id'].clearValidators();
        if (this.ARFselected == 'OTHERS' && this.FileTypeSelected == 'csv') {
          this.compareForm.controls['delimiter'].setValidators([Validators.required]);
        }
        this.compareForm.controls['primary_key'].setValidators([Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]);
      } else {
        this.compareForm.controls['delimiter'].clearValidators();
        this.compareForm.controls['primary_key'].clearValidators();
      }
      this.compareForm.controls['delimiter'].updateValueAndValidity();
      this.compareForm.controls['primary_key'].updateValueAndValidity();
      this.compareForm.controls['source_caller_id'].updateValueAndValidity();
      this.compareForm.controls['destination_caller_id'].updateValueAndValidity();
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.compareForm.controls[controlName].hasError(errorName);
  }
  
  submitCompareForm() {
    Swal.fire('Please wait')
    Swal.showLoading()
    this.controlReadOnly = true;
    this.submitted=true;
    if (this.compareForm.valid) {
      if(this.compareForm.value.arf_type == "REGULAR ARF") {
        this.compareForm.controls['delimiter'].setValue(constants.regularARF_delimiter)
        this.compareForm.controls['primary_key'].setValue("")
      }
      else if(this.compareForm.value.arf_type == "CUSTOM ARF") {
        this.compareForm.controls['delimiter'].setValue(constants.customARF_delimiter)
        this.compareForm.controls['primary_key'].setValue("")
      }
      else if(this.compareForm.value.arf_type == "OTHERS") {
        this.compareForm.value.delimiter
        this.compareForm.controls['source_caller_id'].setValue("")
        this.compareForm.controls['destination_caller_id'].setValue("")
      }
      else {
        this.compareForm.controls['delimiter'].setValue(constants.pipe_delimiter)
        this.compareForm.controls['primary_key'].setValue("")
      }
      if(this.compareForm.value.file_type == "parquet") {
        this.compareForm.controls['delimiter'].setValue("")
      }
      this.compareForm.addControl('feature',  this.fb.control(this.feature))
      const emailArray: [] = this.compareForm.value.emails_list.split(',');
      const date = new Date().toISOString().replace(/-|:|T|Z|\./g, "");
      const caller_id = date + '_' + Math.floor(Math.random() * 10000000000);
      this.compareForm.addControl('caller_id',  this.fb.control(caller_id))
      this.compareForm.addControl('email_list', this.fb.array(emailArray))
      delete this.compareForm.value.emails_list;
      console.log(JSON.stringify(this.compareForm.value));
      console.log(`flask_url: ${environment.flask_api_url}`)
      this.http.post<any>(environment.flask_api_url, this.compareForm.value, {observe: 'response'}).subscribe(
        (response) => {
          console.log(response)
          if(response.body.statusCode == 200){
            this.successNotification()
            this.submitted=true;
            this.controlReadOnly = true;
          }
          else{
          this.failureNotification(response.body.statusCode, response.body.message)
          this.submitted=false;
          this.controlReadOnly = false;
          }
        },
        (error) => {
        console.log(error)
        if(error.status == 0){
          this.failureNotification(error.status, "unable to reach Flask Service")
          this.submitted=false;
          this.controlReadOnly = false;
        }
        else{
        this.failureNotification(error.status, error.statusText.toString())
        this.submitted=false;
        this.controlReadOnly = false;
        }
      })
    }
  }
  successNotification(){
    Swal.fire('SUCCESS', `Caller ID: ${this.compareForm.value.caller_id}`, 'success')
  }
  failureNotification(errorCode: string, error: string){
    Swal.fire('ERROR', `${error}`, 'error')
  }
  refresh(): void {
    this.compareForm.reset();
    this.submitDataForm();
    this.submitted=false;
    this.controlReadOnly = false;
    this.feature = constants.feature;
  }
  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
  gotoTop() {
    window.scroll({
      top: 0,
    });
  }
}
