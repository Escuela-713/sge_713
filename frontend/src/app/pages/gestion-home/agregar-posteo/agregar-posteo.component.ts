import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      image: [''],
      title: [''],
      categoria: ['evento'],
      content: ['']
    });

    // Escuchar cambios y actualizar la señal novedad
    this.form.valueChanges.subscribe((val: { 
      image: string; 
      title: string; 
      categoria: string; 
      content: string 
    }) => {
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
    };
    reader.readAsDataURL(file);
  }
}