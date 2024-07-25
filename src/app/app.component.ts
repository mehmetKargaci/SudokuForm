import {Component, OnInit, inject, DestroyRef} from '@angular/core';
import { AbstractControl, FormArray, FormControl, Validators} from '@angular/forms';
import { validNumber } from './utility/valid-number.validator';
import { ValidationService } from './services/validation.service';
import { SudokuLibraryService } from './services/sudoku.library.service';
import { SudokuSolverService } from './services/sudoku.solver.service';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private validationService = inject (ValidationService);
  private sudokuLibraryService = inject (SudokuLibraryService);
  private sudokuSolverService = inject (SudokuSolverService);
  private destroyRef = inject(DestroyRef);


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
  difficultyLevel = this.sudokuLibraryService.library;
  controlValues = [];
  isAutoSolved = false;
  solutionTime:number;



  ngOnInit(): void {
    this.sudokuFormArray.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((array) => {
      const values : number[] = this.sudokuFormArray.controls.map(
        (control)=> +control.value
      );
      this.controlValues = values;
      this.invalidCellIndexes = this.validationService.validate(values);
      // this.isValid = this.invalidCellIndexes.length === 0 && !!values.find((v)=> v === 0);
      this.isValid = this.invalidCellIndexes.length === 0 && !values.includes(0);
    });
    console.log(this.controls.values());

    this.setLevel('easy');
    this.ready();

  }

  ready() {
    for (const control of this.sudokuFormArray.controls) {
      const value = control.value;
      if (value !== null) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue) && (parsedValue >= 1 && parsedValue <= 9 )) {
          control.disable();
          this.isAutoSolved = false;

        }
      }

    }
  }

  reset() {
    // this.sudokuFormArray.reset();
    this.sudokuFormArray.setValue(this.difficultyLevel.reset);
    this.sudokuFormArray.enable();
    this.isAutoSolved = false;

  }
  solve() {
    const puzzle = this.controlValues;
    // const puzzle = this.sudokuFormArray.value;
    const solution = this.sudokuSolverService.solveSudoku(puzzle.map(Number));
    const validSolution = this.invalidCellIndexes.length === 0 && puzzle.map(Number).includes(0);
    if (validSolution) {
      this.isValid = true;
      this.sudokuFormArray.patchValue(solution.map(String));
      this.isAutoSolved = true;
      this.solutionTime = this.sudokuSolverService.takenTime;
    } else {
      this.isValid = false;
      alert('No solution found');
    }
    }

  get controls() {
    return this.sudokuFormArray.controls;
  }
  setLevel(level: string){
    this.reset();
    this.sudokuFormArray.setValue(this.difficultyLevel[level]);
    this.ready();
  }
}












