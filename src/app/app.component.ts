import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators} from '@angular/forms';
import { validNumber } from './utility/valid-number.validator';
import { ValidationService } from './services/validation.service';
import { SudokuLibraryService } from './services/sudoku.library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private validationService = inject (ValidationService); 
  private sudokuLibraryService = inject (SudokuLibraryService);
  

  dataRow = Array.from(
    Array(81)
      .fill('')
      .map((cell,idx) => {
        return {
          thirdRow: (Math.floor(idx / 9) == 2), 
          sixthRow: (Math.floor(idx / 9) == 5)
        };
      })
  );

  sudokuFormArray = new FormArray(
    Array.from(Array(81)).map(cell => {
    return new FormControl('', [validNumber])
    })
  );

  invalidCellIndexes : number[] = [];
  isValid = false;
    

  ngOnInit(): void {
    this.sudokuFormArray.valueChanges.subscribe((array) => {
      const values : number[] = this.sudokuFormArray.controls.map(
        (control)=> +control.value   
      );
      this.invalidCellIndexes = this.validationService.validate(values);
      // this.isValid = this.invalidCellIndexes.length === 0 && !!values.find((v)=> v === 0);
      this.isValid = this.invalidCellIndexes.length === 0 && !values.includes(0);           
    });

    this.sudokuFormArray.setValue(this.sudokuLibraryService.library.easy);
    this.ready();
    // this.sudokuFormArray.at(5).patchValue('6');   as an eaxample usage of patchValue
  }

  ready() {
    for (const control of this.sudokuFormArray.controls) {
      const value = control.value;
      if (value !== null) {         
        const parsedValue = parseInt(value); 
        if (!isNaN(parsedValue) && (parsedValue >= 1 && parsedValue <= 9 )) { 
          control.disable(); 
             
        }
      }      
       
    }
  }

  reset() {
    this.sudokuFormArray.reset();          
    this.sudokuFormArray.enable(); 

  }      

  get controls() {
    return this.sudokuFormArray.controls;
  } 
  setLevel(level: string){
    this.reset();
    const library = this.sudokuLibraryService.library
    this.sudokuFormArray.setValue(library[level]);
    this.ready();
  } 
}












