
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '@/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: string | null = null;
  sesionExpirada = false;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  constructor() {
    this.sesionExpirada = this.route.snapshot.queryParams['expirada'] === 'true';
    this.form = this.formBuilder.group({
      dni: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  onEnviar(event: Event) {
    event.preventDefault();
    this.errorMessage = null;

    if (this.form.valid) {
      const credentials = {
        dni: this.form.value.dni,
        contrasenia: this.form.value.contrasenia
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Ingreso exitoso');

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
        },
        error: (err) => {
          console.error('Error de autenticación:', err);
          this.errorMessage = 'Error de autenticación';
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get Password() {
    return this.form.get('contrasenia');
  }

  get Dni() {
    return this.form.get('dni');
  }
}
