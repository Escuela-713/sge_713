
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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

  errorPassword = false;
  errorDni: string | null = null;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      dni: ['', Validators.required],
      dniConfirmation: ['', Validators.required],

      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      tercer_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],

      fecha_nacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],

      genero: ['S'],
      tipo_sangre: [''],

      calle: ['', Validators.required],
      numero_calle: ['', [Validators.required, Validators.min(1)]],
      barrio: ['', Validators.required],

      id_localidad: ['', Validators.required],
      id_localidad_nacimiento: ['', Validators.required],

      // Credenciales
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required]
    });
  }

  onChangeDni() {
    this.Dni?.value !== this.DniConfirmation?.value;
  }

  onChangePassword() {
    this.errorPassword =
      this.Password?.value !== this.PasswordConfirmation?.value;
  }

  onEnviar(event: Event) {
    event.preventDefault();

    this.errorMessage = null;
    this.successMessage = null;

    this.onChangeDni();
    this.onChangePassword();

    if (
      this.form.valid &&
      !this.errorPassword &&
      !this.errorDni
    ) {
      const {
        dniConfirmation,
        password,
        passwordConfirmation,
        ...persona
      } = this.form.getRawValue();

      const datosRegistro = {
        ...persona,
        dni: String(persona.dni),
        numero_calle: Number(persona.numero_calle),
        id_localidad: Number(persona.id_localidad),
        id_localidad_nacimiento: Number(
          persona.id_localidad_nacimiento
        ),
        tipo_sangre: persona.tipo_sangre || null,
        contrasenia: password
      };

      this.authService.register(datosRegistro).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);

          this.successMessage =
            '¡Usuario registrado con éxito! Redirigiendo...';

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },

        error: (err) => {
          console.error('Error del backend:', err);

          const errors = err.error;

          if (errors && typeof errors === 'object') {
            if (errors.detail) {
              this.errorMessage = errors.detail;
            } else if (errors.error) {
              this.errorMessage = Array.isArray(errors.error)
                ? errors.error[0]
                : errors.error;
            } else {
              const firstError = Object.values(errors)[0];

              this.errorMessage = Array.isArray(firstError)
                ? String(firstError[0])
                : String(firstError);
            }
          } else {
            this.errorMessage =
              'No se pudo conectar con el servidor.';
          }
        }
      });

    } else {
      console.warn('El formulario tiene errores o campos pendientes.');
      this.form.markAllAsTouched();
    }
  }

  // Getters para el HTML

  get Dni() {
    return this.form.get('dni');
  }

  get DniConfirmation() {
    return this.form.get('dniConfirmation');
  }

  get PrimerNombre() {
    return this.form.get('primer_nombre');
  }

  get PrimerApellido() {
    return this.form.get('primer_apellido');
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  get PasswordConfirmation() {
    return this.form.get('passwordConfirmation');
  }
}

