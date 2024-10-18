import { Component, numberAttribute } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router) {

    this.form = this.formBuilder.group(
      {
        cuil: ['', [Validators.required,]],
        password: ['', [Validators.required]]
      }
    )

  }

  onEnviar(event: Event) {
    console.log(this.form.value)

    event.preventDefault;
    if (this.form.valid) {
      //alert("Enviar al servidor...")
      this.router.navigate(["/home"]);
    }
    else {


      this.form.markAllAsTouched();
    }
  }

  get Password() {
    return this.form.get("password");
  }
  get Cuil() {
    return this.form.get("cuil");
  }


}
