import { Injectable, inject } from "@angular/core";
import { ValidationService } from "./validation.service";


@Injectable({ providedIn:'root'})

export class SudokuSolverService{  
  private validationService = inject (ValidationService);  
  takenTime: number;

  solveSudoku(baseValues:number[]):number[] | null {
    const startTime = performance.now();    

    const solutionArray = [...baseValues];
    if (this.solve(solutionArray)) {
      const endTime = performance.now();
      this.takenTime = endTime - startTime;
     
      return solutionArray;
    }
    return null;

  }

  solve(board:number[]):boolean {
    
    const emtyCellIndex = this.findEmptyCell(board);
    if(emtyCellIndex === -1){ return true;

    }
    for (let num = 1; num <= 9 ; num++){
      if(this.validationService.validate(board).length === 0 ){
        board[emtyCellIndex]= num;
        if(this.solve(board )){
          return true;
        }
        board[emtyCellIndex]= 0;
      }

    }
    return false;
  }
  findEmptyCell(puzzle: number[]): number {
    return puzzle.indexOf(0); // Find the first empty cell
  }

}