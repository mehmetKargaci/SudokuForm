import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl} from '@angular/forms';
import { validNumber } from './valid-number.validator';
import { SudokuValidator } from './sudoku-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {  
  

  dataRow = Array.from(Array(81).fill('').map((cell,idx) => {
    return {thirdRow: (Math.floor(idx / 9) == 2), sixthRow: (Math.floor(idx / 9) == 5)}
  }));

  sudokuFormArray = new FormArray(Array.from(Array(81)).map(cell => {
    return new FormControl('', [validNumber])
  }));

  validator = new SudokuValidator();
  elements = [];
  isValid = false;
  

  ngOnInit(): void {
    this.sudokuFormArray.valueChanges.subscribe(value =>
      this.elements = value     
    );    
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

  get controls() {
    return this.sudokuFormArray.controls;
  }

  getGridValues() {
    const val = this.elements.map((val => parseInt(val)));
    const gridArray = Array.from(Array(9), (_, ind) => val.slice(ind * 9, ind * 9 + 9));        
    return gridArray;   
  }  

  validateSudoku() {
    const grid = this.getGridValues();
    let result = this.validator.validateRows(grid) && this.validator.validateColumns(grid) && this.validator.validateSubgrids(grid);
    this.isValid = !result;
    return result; 
  }

  popUpMessage(){
    if (this.validateSudoku()) {
      return 'Congruculations!!! Valid Sudoku Solution';
    } else {
    return'Invalid Sudoku Solution';
    }
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












