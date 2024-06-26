import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SudokuLibraryService {
    library = {
        easy : ['','','2','','5','6','8','7','4','','','3','','','','','',
        '','','','','2','','8','','5','','3','9','','','','7','','','','6','','','','','','','','5',
        '','','','4','','','','9','8','','6','','9','','4','','','','','','','','','','5','','',
        '7','4','9','5','3','','6','',''],

        medium: ['5', '', '7', '2', '', '', '', '9', '', '', '', '6', '', '3', '', '7', '', '1', '4', '', '', '', '', '',
        '', '6', '', '1', '', '', '4', '9', '', '', '', '7', '', '', '','5', '', '8', '', '', '',
        '8', '', '', '', '2', '7', '', '', '5', '', '7', '', '', '', '', '','', '9', '2', '', '9', '', '8', '', '6',
        '', '','', '4', '', '', '', '9', '3', '', '8'
      ],

        hard: ['2', '', '', '', '', '9', '', '', '','','9', '', '5', '', '', '', '6', '','8', '1', '5', '', '7', '','9', '','',
        '1', '', '', '', '6', '7', '', '9', '','9', '', '', '4', '5', '', '', '', '2','', '3','', '', '', '', '', '', '8',
        '', '5', '', '', '', '', '8', '2', '','4', '', '', '', '', '', '', '1', '6','3','', '', '2', '', '', '', '', '7',],
        
        reset: ['', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '', '','', '', '', '', '', '','', '','',
        '', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '','', '','', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '','', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '', '',]

    };

}