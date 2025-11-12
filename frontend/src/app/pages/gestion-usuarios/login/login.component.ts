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
      const usuarios = [
        { cuil: "20478556331", password: "admin123", rol: "admin", nombre: "Administrador" },
        { cuil: "27123456789", password: "profesor123", rol: "profesor", nombre: "Profesor" },
        { cuil: "20987654321", password: "alumno123", rol: "alumno", nombre: "Alumno" },
        { cuil: "23456789012", password: "bedel123", rol: "bedel", nombre: "Bedel" }
      ];

      const usuario = usuarios.find(u => u.cuil === this.Cuil?.value && u.password === this.Password?.value);

      if (usuario) {
        // Simular almacenamiento de sesión
        localStorage.setItem('currentUser', JSON.stringify({
          cuil: usuario.cuil,
          rol: usuario.rol,
          nombre: usuario.nombre
        }));

        console.log(`Ingreso exitoso - Usuario: ${usuario.nombre}, Rol: ${usuario.rol}`);
        this.router.navigate(["/dashboard/home"]);
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
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
