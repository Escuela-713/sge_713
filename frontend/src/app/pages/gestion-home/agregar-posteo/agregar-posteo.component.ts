import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovedadesService, Publication } from '../../../services/novedades.service';
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

  constructor(private fb: FormBuilder, private novedadesService: NovedadesService, private router: Router, private categoriasService: CategoriasService, private chr: ChangeDetectorRef) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required]],
      categoria: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.form.valueChanges.subscribe(val => {
      this.novedad.set({
        title: val.title || 'Título de ejemplo',
        content: val.content,
        image: val.image,
        categoria: val.categoria,
        is_published: false,
        upload_date: new Date().toISOString(),
        update_date: new Date().toISOString()
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
      },
      complete: ()=> {this.chr.detectChanges()}
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
      const val = this.form.value;
      const publicacion: Omit<Publication, 'id'> = {
        title: val.title,
        content: val.content,
        image: val.image,
        categoria: val.categoria,
        is_published: false,
        upload_date: new Date().toISOString(),
        update_date: new Date().toISOString()
      };
      console.log (publicacion)
      this.novedadesService.crearPublicacion(publicacion).subscribe({
      next: (response) => {
        console.log('Publicación guardada:', response);
        alert('Publicación agregada correctamente');
        this.router.navigate(['/dashboard/home']);
      },
      error: (err) => {
        console.error('Error al guardar la publicación:', err);
        alert('No se pudo guardar la publicación');
      }
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