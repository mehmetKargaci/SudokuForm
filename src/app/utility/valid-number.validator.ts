
import { AbstractControl } from '@angular/forms';

export function validNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const value = Number(control.value);
  if (typeof value === 'number' && value >= 1 && value <= 9 ) {
    return null;
  } else {
    return { 'invalidNumber': true };
  }
}