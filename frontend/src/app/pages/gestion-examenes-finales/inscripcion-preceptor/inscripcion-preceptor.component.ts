import { Component, inject } from '@angular/core'
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms'
import { MesasExamenesService } from '@/app/services/mesas-examenes.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-inscripcion-preceptor',
  imports: [ReactiveFormsModule],
  templateUrl: './inscripcion-preceptor.component.html',
  styleUrl: './inscripcion-preceptor.component.css',
})
export class InscripcionPreceptorComponent {
  private fb = inject(FormBuilder)
  private mesaServicio = inject(MesasExamenesService)
  private ruta = inject(ActivatedRoute)

  idMesa = this.ruta.snapshot.paramMap.get('id')

  formularioDeInscripcion = this.fb.group({
    dni: [
      '',
      [Validators.minLength(8), Validators.maxLength(8), Validators.required],
    ],
  })

  get Dni() {
    return this.formularioDeInscripcion.get('dni') as AbstractControl
  }

  inscribirAlumno() {
    if (this.formularioDeInscripcion.invalid) {
      return alert('Revise el formulario.')
    }

    if (!this.idMesa) {
      return
    }

    const inscripcion = {
      dni: Number(this.Dni.value),
      id_mesa_examen: Number(this.idMesa),
    }

    this.mesaServicio.inscribirAlumno(inscripcion).subscribe({
      next: (data: any) => {
        alert(data.data)
      },
      error: (error: any) => {
        alert(error.message)
      },
      complete: () => console.log('Inscripción completa.'),
    })
  }
}
