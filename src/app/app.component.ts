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

  startValues: string[] = []; 
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
    this.startValues = ['','','2','','5','','8','7','4','','','3','','','','','',
    '','','','','2','','8','','5','','3','9','','','','7','','','','6','','','','','','','','5',
    '','','','4','','','','9','8','','6','','9','','4','','','','','','','','','','5','','',
    '7','4','9','5','3','','6','',''];

    this.sudokuFormArray.setValue(this.startValues);
    this.sudokuFormArray.at(5).patchValue('6');   //as an eaxample usage of patchValue
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
    // this.sudokuFormArray.reset()
    for (const control of this.sudokuFormArray.controls) {
        control.setValue('');            
        control.enable();        
    }
    this.sudokuFormArray.setValue(this.startValues);
    this.sudokuFormArray.at(5).patchValue('6'); 
    this.isValid = false;
  }      

  get controls() {
    return this.sudokuFormArray.controls;
  } 
  
  setEasyLevel(){
    this.reset();
    this.startValues = ['','','2','','5','','8','7','4','','','3','','','','','',
    '','','','','2','','8','','5','','3','9','','','','7','','','','6','','','','','','','','5',
    '','','','4','','','','9','8','','6','','9','','4','','','','','','','','','','5','','',
    '7','4','9','5','3','','6','',''];
    this.sudokuFormArray.setValue(this.startValues);
  }
  setMediumLevel(){
    this.reset();
    this.startValues = [
      '5', '', '7', '2', '', '', '', '9', '', '', '', '6', '', '3', '', '7', '', '1', '4', '', '', '', '', '',
      '', '6', '', '1', '', '', '4', '9', '', '', '', '7', '', '', '','5', '', '8', '', '', '',
      '8', '', '', '', '2', '7', '', '', '5', '', '7', '', '', '', '', '','', '9', '2', '', '9', '', '8', '', '6',
      '', '','', '4', '', '', '', '9', '3', '', '8'
    ]; 
    this.sudokuFormArray.setValue(this.startValues);

  }
  setHardLevel(){
    this.reset();
    this.startValues = [
      '2', '', '', '', '', '9', '', '', '','','9', '', '5', '', '', '', '6', '','8', '1', '5', '', '7', '','9', '','',
      '1', '', '', '', '6', '7', '', '9', '','9', '', '', '4', '5', '', '', '', '2','', '3','', '', '', '', '', '', '8',
      '', '5', '', '', '', '', '8', '2', '','4', '', '', '', '', '', '', '1', '6','3','', '', '2', '', '', '', '', '7',       
    ];
    this.sudokuFormArray.setValue(this.startValues);
  }

}












