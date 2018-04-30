import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: 'input[upper]',
    host: {
        '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
    }

})

export class UpperCaseTextComponent {
    constructor(private ref: ElementRef) {
    }
}