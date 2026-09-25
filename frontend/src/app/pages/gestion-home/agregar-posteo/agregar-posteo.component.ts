import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovedadesService } from '../../../services/novedades.service';
import { CategoriasService, Categoria } from '../../../services/categorias.service';

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
  categorias: Categoria[] = [];

  constructor(private fb: FormBuilder, private novedadesService: NovedadesService, private router: Router, private categoriasService: CategoriasService) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required]],
      categoria: ['', Validators.required],
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
     this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log('Categorías cargadas:', this.categorias);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
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
        alert('Publicación agregada correctamente');
        this.router.navigate(['/dashboard/home']);
      }).catch((err: any) => {
        console.error('Error agregando la publicación', err);
        alert('No se pudo agregar la publicación');
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    if (this.form.dirty) {
      const confirm = window.confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.');
      if (!confirm) return;
    }
    this.router.navigate(['/dashboard/home']);
  }
}
