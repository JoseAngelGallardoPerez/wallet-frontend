import { Directive, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[toUpperCase]'
})
export class ToUpperCaseDirective implements OnInit {
  constructor(
    private ngControl: NgControl,
  ) {
  }

  ngOnInit() {
    this.ngControl.valueChanges.subscribe((value) => {
      if (value !== value.toUpperCase()) {
        this.ngControl.control.setValue(value.toUpperCase());
      }
    });
  }
}
