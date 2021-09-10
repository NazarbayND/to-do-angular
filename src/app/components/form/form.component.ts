import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface IFormInput {
  placeholder: string;
  btn: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() input: IFormInput = {
    placeholder: '',
    btn: '',
  };

  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>();
  title: string = '';

  handleSubmit(): void {
    if (!this.title) {
      alert('plese write something');
      return;
    }
    this.onSubmit.emit(this.title);
    this.title = '';
  }
}
