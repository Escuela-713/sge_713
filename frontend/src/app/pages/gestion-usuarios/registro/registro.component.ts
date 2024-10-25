import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
  
})
export class RegistroComponent {
  form!:FormGroup;
  errorPassword:boolean=false;
  errorCuil:boolean=false;
  constructor(private formBuilder: FormBuilder, private router:Router )
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
        aceptoterminos:['',[Validators.required]],
      } 
    )

  }
  
  onChangeCuil()
  {
    if (this.Cuil?.value==this.Cuilconfirmation?.value )
      {
        this.errorCuil=false;
      }
      else{
        this.errorCuil=true;
      }
  }

onChangePassword()
{

    if (this.Password?.value==this.Passwordconfirmation?.value)
    {
      this.errorPassword=false;
    }
    else{
      this.errorPassword=true;
    }
}

  onEnviar(event: Event) {
    console.log(this.form.value)

    event.preventDefault;
    if (this.form.valid) 
      {
        
          alert("Enviar al servidor...")
          this.router.navigate(["/iniciar-sesion"]);
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
    return this.form.get("name");
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
  get Aceptarterminos() {
    return this.form.get("aceptarterminos");
  }

}

