import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  sudokuForm!: FormGroup; 
  cellNumbers: string[]= [];


  ngOnInit(): void {
    this.sudokuForm = new FormGroup({
      boardControl: new FormControl(null),
      boardCell : new FormArray([        
      ]),

    });
    this.cellNumbers= Array(9);
    
  }

  onClick(){
    console.log(this.sudokuForm);
      
  }
  get controls() {
    return (this.sudokuForm.get('boardArray') as FormArray).controls;
  }


  onAddControl(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.sudokuForm.get('boardArray')).push(control);

  }
}
