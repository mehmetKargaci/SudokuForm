import { FormControl } from "@angular/forms";


export class SudokuValidator {

  validateRows(grid: number[][]) { 
    for (let i = 0;  i< 9; i++) {
      const row = grid[i];
      if (!this.isUniqueArray(row)) {
        return false;
      }
    }
    return true;
  }  

  // Validate each column 
  validateColumns(grid: number[][]) {
    for (let col = 0; col < 9; col++) {
      const column = grid.map(row => row[col]);
      if (!this.isUniqueArray(column)) {
        return false;
      }
    }
    return true;
  }

  // Validate each 3x3 subgrid contains unique numbers 
  validateSubgrids(grid: number[][]) {
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const subgrid = [];
        for (let r = row; r < row + 3; r++) {
          for (let c = col; c < col + 3; c++) {
            subgrid.push(grid[r][c]);
          }
        }
        if (!this.isUniqueArray(subgrid)) {
          return false;
        }
      }
    }
    return true;
  }

  // check unique numbers 1-9
  isUniqueArray(arr: number[]) {
    const uniqueSet = new Set(arr.filter(num => num > 0 && num <= 9));
    return uniqueSet.size === arr.filter(num => num > 0 && num <= 9).length;
  }
}