import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
      alert(`POST: ${JSON.stringify(this.form.value)}`);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
