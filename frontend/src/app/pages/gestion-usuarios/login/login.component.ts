import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  constructor() {

    this.form = this.formBuilder.group(
      {
        cuil: ['', [Validators.required,]],
        password: ['', [Validators.required]]
      }
    )

  }

  onEnviar(event: Event) {
    event.preventDefault();
    this.errorMessage = null;

    if (this.form.valid) {
      const credentials = {
        cuil: this.Cuil?.value,
        contrasenia: this.Password?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Ingreso exitoso, token recibido');
          this.router.navigate(["/dashboard/home"]);
        },
        error: (err) => {
          console.error('Error de autenticación:', err);
          this.errorMessage = "Credenciales incorrectas o error en el servidor";
        }
      });

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