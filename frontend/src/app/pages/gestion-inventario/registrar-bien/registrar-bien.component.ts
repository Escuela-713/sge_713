import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { BienesService } from '../../../services/bienes.service';

@Component({
  selector: 'app-registrar-bien',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-bien.component.html',
  styleUrl: './registrar-bien.component.css'
})
export class RegistrarBienComponent implements OnInit {
  formulario!: FormGroup;
  enviando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(
    private fb: FormBuilder,
    private bienesService: BienesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      codigo: ['', [Validators.required, Validators.minLength(2)]],
      ubicacion: ['', [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      estado: ['', [Validators.required]],
      descripcion: ['']
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      this.mostrarMensaje('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    this.enviando = true;
    const bien = this.formulario.value;

    this.bienesService.crearBien(bien).subscribe({
      next: (respuesta) => {
        this.mostrarMensaje('¡Bien registrado exitosamente!', 'exito');
        this.formulario.reset({ cantidad: 1 });
        
        setTimeout(() => {
          this.router.navigate(['/gestion-inventario/bienes-registrados']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al registrar bien:', error);
        this.mostrarMensaje('Error al registrar el bien. Intenta nuevamente.', 'error');
        this.enviando = false;
      },
      complete: () => {
        this.enviando = false;
      }
    });
  }

  onCancelar() {
    this.formulario.reset({ cantidad: 1 });
    this.router.navigate(['/gestion-inventario/bienes-registrados']);
  }

  private mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
  }

  get nombre() { return this.formulario.get('nombre'); }
  get codigo() { return this.formulario.get('codigo'); }
  get ubicacion() { return this.formulario.get('ubicacion'); }
  get cantidad() { return this.formulario.get('cantidad'); }
  get estado() { return this.formulario.get('estado'); }
}
