import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/app/services/autenticacion.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form!: FormGroup;
  errorPassword: boolean = false;
  errorCuil: boolean = false;
  
  // Variables para feedback visual en el HTML
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.form = this.formBuilder.group({
      cuil: ['', [Validators.required]],
      cuilconfirmation: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordconfirmation: ['', [Validators.required]],
    });
  }
  
  onChangeCuil() {
    if (this.Cuil?.value === this.Cuilconfirmation?.value) {
      this.errorCuil = false;
    } else {
      this.errorCuil = true;
    }
  }

  onChangePassword() {
    if (this.Password?.value === this.Passwordconfirmation?.value) {
      this.errorPassword = false;
    } else {
      this.errorPassword = true;
    }
  }

  onEnviar(event: Event) {
    event.preventDefault();
    
    // Limpiamos mensajes anteriores al intentar enviar
    this.errorMessage = null;
    this.successMessage = null;

    this.onChangeCuil();
    this.onChangePassword();

    if (this.form.valid && !this.errorPassword && !this.errorCuil) {
      const datosRegistro = {
        cuil: this.form.value.cuil.toString(),
        contrasenia: this.form.value.password
      };

      this.authService.register(datosRegistro).subscribe({
        next: (response) => {
          console.log("Registro exitoso:", response);
          this.successMessage = "¡Usuario registrado con éxito! Redirigiendo...";
          setTimeout(() => {
            this.router.navigate(["/iniciar-sesion"]);
          }, 1500);
        },
        error: (err) => {
          console.error("Error del backend:", err);
          const errorData = err.error;

          if (errorData) {
            // Si Django devuelve un error específico por campo (ej: cuil: [...])
            if (errorData.cuil) {
              this.errorMessage = errorData.cuil[0];
            } else if (errorData.contrasenia) {
              this.errorMessage = errorData.contrasenia[0];
            } else if (errorData.detail) {
              // Si DRF devuelve un error general del tipo 'detail'
              this.errorMessage = errorData.detail;
            } else if (typeof errorData === 'object') {
              // Si viene otro objeto, tomamos el primer mensaje disponible
              const firstKey = Object.keys(errorData)[0];
              const firstError = errorData[firstKey];
              this.errorMessage = Array.isArray(firstError) ? firstError[0] : "Ocurrió un error de validación.";
            } else {
              this.errorMessage = "Ocurrió un error al registrarse.";
            }
          } else {
            this.errorMessage = "No se pudo conectar con el servidor.";
          }
        }
      });

    } else {
      console.warn("El formulario tiene errores o campos pendientes.");
      this.form.markAllAsTouched();
    }
  }

  get Password() {
    return this.form.get("password");
  }
  get Passwordconfirmation() {
    return this.form.get("passwordconfirmation");
  }
  get Cuil() {
    return this.form.get("cuil");
  }
  get Cuilconfirmation() {
    return this.form.get("cuilconfirmation");
  }
}