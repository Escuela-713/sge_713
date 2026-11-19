
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
  form: FormGroup;

  errorDni = false;
  errorPassword = false;

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      primer_nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      dni: ['', Validators.required],
      dniConfirmation: ['', Validators.required],

      segundo_nombre: [''],
      tercer_nombre: [''],
      segundo_apellido: [''],

      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['S'],
      tipo_sangre: [null],

      calle: ['', Validators.required],
      numero_calle: ['', [Validators.required, Validators.min(1)]],
      barrio: ['', Validators.required],
      id_localidad: ['', Validators.required],
      id_localidad_nacimiento: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required]
    });
  }

  onChangeDni(): void {
    const dni = this.Dni?.value;
    const confirmacion = this.DniConfirmation?.value;

    this.errorDni = !!confirmacion && dni !== confirmacion;
  }

  onChangePassword(): void {
    const password = this.Password?.value;
    const confirmacion = this.PasswordConfirmation?.value;

    this.errorPassword =
      !!confirmacion && password !== confirmacion;
  }

  onEnviar(event: Event): void {
    event.preventDefault();

    this.errorMessage = null;
    this.successMessage = null;

    this.onChangeDni();
    this.onChangePassword();

    if (this.form.invalid || this.errorDni || this.errorPassword) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.value;

    const datosRegistro = {
      dni: valores.dni.toString(),
      primer_nombre: valores.primer_nombre,
      segundo_nombre: valores.segundo_nombre,
      tercer_nombre: valores.tercer_nombre,
      primer_apellido: valores.primer_apellido,
      segundo_apellido: valores.segundo_apellido,
      fecha_nacimiento: valores.fecha_nacimiento,
      email: valores.email,
      telefono: valores.telefono,
      genero: valores.genero,
      tipo_sangre: valores.tipo_sangre || null,
      calle: valores.calle,
      numero_calle: Number(valores.numero_calle),
      barrio: valores.barrio,
      id_localidad: Number(valores.id_localidad),
      id_localidad_nacimiento: Number(valores.id_localidad_nacimiento),
      contrasenia: valores.password
    };

    this.authService.register(datosRegistro).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);

        this.successMessage = '¡Usuario registrado con éxito! Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },

      error: (err) => {
        console.error('Error del backend:', err);

        const errorData = err.error;

        if (errorData?.dni) {
          this.errorMessage = errorData.dni[0];
        } else if (errorData?.contrasenia) {
          this.errorMessage = errorData.contrasenia[0];
        } else if (errorData?.detail) {
          this.errorMessage = errorData.detail;
        } else if (errorData && typeof errorData === 'object') {
          const firstKey = Object.keys(errorData)[0];
          const firstError = errorData[firstKey];

          this.errorMessage = Array.isArray(firstError)
            ? firstError[0]
            : 'Ocurrió un error de validación.';
        } else {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        }
      }
    });
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

  get Dni() {
    return this.form.get('dni');
  }

  get DniConfirmation() {
    return this.form.get('dniConfirmation');
  }

  get Password() {
    return this.form.get('password');
  }

  get PasswordConfirmation() {
    return this.form.get('passwordConfirmation');
  }
}
