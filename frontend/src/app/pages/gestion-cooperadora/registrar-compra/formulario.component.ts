import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  
  FormularioComponentForm: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.FormularioComponentForm = this.formbuilder.group({

    

    });
  }
}
