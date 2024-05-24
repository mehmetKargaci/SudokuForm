import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators} from '@angular/forms';
import { validNumber } from './utility/valid-number.validator';
import { ValidationService } from './services/validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private validationService = inject (ValidationService); 
  

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
    this.sudokuFormArray.valueChanges.subscribe((array)=>{
      this.invalidCellIndexes = this.validationService.validate(
        array.map((a) => Number(a))
      );
      const allCellsFilled = array.every(cell => cell !== null && cell !== '');      
      this.isValid = this.invalidCellIndexes.length === 0 && allCellsFilled ;
           
    });     
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
    this.isValid = false;
  }    

  get controls() {
    return this.sudokuFormArray.controls;
  }  

}












