import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]]
      }
    )

  }

  onEnviar(event: Event) {
    console.log(this.form.value)

    event.preventDefault;
    if (this.form.valid) {
      alert("Enviar al servidor...")
    }
    else {


      this.form.markAllAsTouched();
    }
  }

  get Password() {
    return this.form.get("password");
  }
  get Email() {
    return this.form.get("email");
  }


}
