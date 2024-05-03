import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { validNumber } from './valid-number.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
[x: string]: any;


  sudokuFormArray = new FormArray(Array.from(Array(81)).map(cell => {
    return new FormControl('', [validNumber ])
  }));

  ngOnInit(): void {
    this.sudokuFormArray.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  ready() {
    for (const control of this.sudokuFormArray.controls) {
      const value = control.value;
      if (value !== null) { 
        const parsedValue = parseInt(value); 
        if (!isNaN(parsedValue) && (parsedValue >= 1 && parsedValue <= 9)) { 
          control.disable();
        }
      }
    }
  }

  reset() {
    // this.sudokuFormArray.reset()
    for (const control of this.sudokuFormArray.controls) {
        control.setValue('');
        control.enable();
    }
  }  

  isSixthRow(index: number): boolean {
    return Math.floor(index / 9) == 5;
  }

  isThirdRow(index: number): boolean {
    return Math.floor(index / 9) == 2;
  }

  get sudokuForms() {
    return this.sudokuFormArray.controls;
  }

  getErrorMessage(index: number) {
    const control = this.sudokuFormArray.controls[index];
    // if (control.hasError('required')) {
    //   return 'Please enter a valid number (1-9)';
    // }
    if (control.hasError('invalidNumber')) {      
      return 'Value must be between 1-9';
  }
    return null;
  }
}





