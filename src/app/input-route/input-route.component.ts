import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { suffixes as _suffixes } from '../constants'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-input-route',
  templateUrl: './input-route.component.html',
  styleUrls: ['./input-route.component.css']
})
export class InputRouteComponent implements OnInit {
  control = new FormControl('', [
    Validators.required,
    this.checkValidInput()
  ]);

  matcher = new MyErrorStateMatcher();
  prefix: string = "";
  suffix: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkValidInput(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const valid = this.checkValue(value);
        return !valid ? { invalidInput: true }: null;
    }
  }

  checkValue(str: string): boolean {
    const suffixes: string[] = Object.keys(_suffixes);
    // remove all spaces
    str = str.replace(/\s/g, '');
    this.suffix = str.substr(str.length - 1);
    // either we have a valid suffix, or the whole input has to be valid numeric
    if (suffixes.indexOf(this.suffix) == -1) {
      this.suffix = "";
      if (!this.isNumeric(str)) return false;
    }
    // set the prefix
    this.prefix = this.isNumeric(str) ? str : str.substr(0, str.length - 1);
    //check if prefix is a number
    if (!this.isNumeric(this.prefix)) return false;
    if (+this.prefix == 0) return false;
    
    return true;
  }

  checkButtonStatus(): boolean {
    return !this.control.valid;
  }

  isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }

  onClick(event: any) {
    event.preventDefault();
    if (!this.checkButtonStatus()) this.router.navigate([`output`], 
              { 
                state: 
                { 
                  prefix: this.prefix, 
                  suffix: this.suffix 
                } 
              });
  }

}