import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
  
})
export class RegistroComponent {
  form!:FormGroup;
  constructor(private formBuilder: FormBuilder)
  { 

    this.form=this.formBuilder.group(
      {
        email:['',[Validators.email,Validators.required]],
        password:['',[Validators.required]],
        passwordconfirmation:['',[Validators.required]],
        name:['',[Validators.required]],
        surname:['',[Validators.required]],
        cuil:['',[Validators.required]],
        cuilconfirmation:['',[Validators.required]],
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
  get Passwordconfirmation() {
    return this.form.get("passwordconfirmation");
  }
  get Email() {
    return this.form.get("email");
  }
  get Name() {
    return this.form.get["name"];
  }
  get Surname() {
    return this.form.get("surname");
  }
  get Cuil() {
    return this.form.get("cuil");
  }
  get Cuilconfirmation() {
    return this.form.get("cuilconfirmation");
  }

}

