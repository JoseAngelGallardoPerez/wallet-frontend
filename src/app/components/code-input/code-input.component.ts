import { Component, ElementRef, EventEmitter, forwardRef, Output, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true,
    },
  ],
})
export class CodeInputComponent implements ControlValueAccessor {
  @ViewChildren('input') inputs: QueryList<ElementRef>;

  @Output() codeEntered: EventEmitter<string> = new EventEmitter<string>();

  public onChange: Function;
  public onTouched: Function;

  public value: string;
  public form: FormGroup;
  public activeField = 0;
  public maxFields = 6;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  public onFocus(event: Event): void {
    this.activeField = this.inputs.toArray().findIndex(item => item.nativeElement === event.target);
  }

  public onKeyPress(event: KeyboardEvent): void {
    if (!this.isKeyAvailable(event.key)) {
      event.preventDefault();
      return;
    }

    this.form.get(String(this.activeField)).setValue('');
    this.form.get(String(this.activeField)).setValue(event.key);

    this.nextField();
  }

  public back(event: KeyboardEvent): void {
    this.prevField();
  }

  public clear(): Promise<void>  {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        for (let i = 0; i < this.maxFields; i++) {
          this.form.get(String(i)).setValue('');
        }
        this.activeField = 0;
        const input: HTMLInputElement = this.inputs.toArray()[this.activeField].nativeElement;
        input.focus();
      }, 500);
    });
  }

  private isKeyAvailable(key: string): boolean {
    const availableChars = /^[\d\w]$/i;
    return availableChars.test(key);
  }

  private nextField(): void {
    if (this.activeField < this.maxFields - 1) {
      this.activeField += 1;
      const input: HTMLInputElement = this.inputs.toArray()[this.activeField].nativeElement;
      input.focus();
    } else {
      const input: HTMLInputElement = this.inputs.toArray()[this.activeField].nativeElement;
      input.blur();
      this.codeEntered.emit(this.getFullValue());
      this.clear();
    }
  }

  private prevField(): void {
    if (this.activeField > 0) {
      this.activeField -= 1;
      const input: HTMLInputElement = this.inputs.toArray()[this.activeField].nativeElement;
      input.focus();
    }
  }

  private getFullValue(): string {
    return Object.values(this.form.controls).map((control: AbstractControl) => control.value).join('');
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      0: [''],
      1: [''],
      2: [''],
      3: [''],
      4: [''],
      5: [''],
    });
  }
}
