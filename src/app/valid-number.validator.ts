
import { AbstractControl } from '@angular/forms';

export function validNumber(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (value === '' || (value >= 1 && value <= 9)) {
    return null;
  } else {
    return { 'invalidNumber': true };
  }
}