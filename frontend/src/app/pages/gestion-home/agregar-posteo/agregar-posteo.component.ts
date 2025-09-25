import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovedadesService } from '../../../service/novedades.service';

@Component({
  selector: 'app-agregar-posteo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-posteo.component.html',
  styleUrls: ['./agregar-posteo.component.css']
})
export class AgregarPosteoComponent {
  form: FormGroup;
  novedad = signal<any | null>(null);

  constructor(private fb: FormBuilder, private novedadesService: NovedadesService, private router: Router) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      categoria: ['evento', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.form.valueChanges.subscribe(val => {
      this.novedad.set({
        backgroundImage: val.image,
        title: val.title || 'Título de ejemplo',
        location: val.categoria,
        locationIcon: 'M192 0 ...', // ícono de ubicación
        date: new Date().toLocaleDateString(),
        dateIcon: 'M0 64C0 46 ...', // ícono de fecha
        description: val.content
      });
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ image: reader.result });
      this.form.get('image')?.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.valid) {
      // Guardar usando el servicio
      const val = this.form.value;
      this.novedad.set({
        backgroundImage: val.image,
        title: val.title,
        location: val.categoria,
        date: new Date().toLocaleDateString(),
        description: val.content
      });
      // Añadir al storage (async)
      const payload = {
        title: val.title,
        description: val.content,
        backgroundImage: val.image,
        location: val.categoria,
        date: new Date().toLocaleDateString(),
        locationIcon: '',
        dateIcon: ''
      };
      this.novedadesService.addCard(payload as any).then(() => {
        alert('Posteo agregado');
        this.router.navigate(['/dashboard/home']);
      }).catch((err: any) => {
        console.error('Error agregando posteo', err);
        alert('No se pudo agregar el posteo');
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
