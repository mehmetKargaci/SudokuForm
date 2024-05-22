import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
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
  

  ngOnInit(): void {
    // this.sudokuFormArray.valueChanges.subscribe(value => {
    //   console.log(value)
    // })
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
    const values = this.sudokuFormArray.value.map(value => parseInt(value));
    return Array.from(Array(9), (_, ind) => values.slice(ind * 9, ind * 9 + 9));
    }

  validateSudoku() {
    const grid = this.getGridValues();
    return this.validator.validateRows(grid) && this.validator.validateColumns(grid) && this.validator.validateSubgrids(grid);
  }  

  checkSolution() {
    const grid = this.getGridValues();
    const row = this.validator.validateRows(grid)
    const column = this.validator.validateColumns(grid)
    console.log(column);

    // if (this.sudokuFormArray.valid && this.validateSudoku()) {
    //   console.log('Valid Sudoku Solution:', this.sudokuFormArray.value);
    // } else {
    //   console.error('Invalid Sudoku Solution');
    // }
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












