import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovedadesService, Publication } from '../../../services/novedades.service';
import { CategoriasService, Categoria } from '../../../services/categorias.service';

interface NovedadPreview {
  title: string;
  content: string;
  image: string;
  categoria: string | number;
  is_published: boolean;
  upload_date: string;
  update_date: string;
}

@Component({
  selector: 'app-agregar-posteo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-posteo.component.html',
  styleUrls: ['./agregar-posteo.component.css']
})
export class AgregarPosteoComponent implements OnDestroy {
  form: FormGroup;
  novedad: NovedadPreview | null = null;
  categorias: Categoria[] = [];

  // El archivo real que se sube al backend. El control 'image' del form
  // solo sirve para que el Validators.required detecte si hay imagen o no,
  // pero NO contiene el archivo (por eso se separa acá).
  selectedFile: File | null = null;
  isSubmitting = false;

  private previewObjectUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private novedadesService: NovedadesService,
    private router: Router,
    private categoriasService: CategoriasService,
    private chr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required]],
      categoria: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.form.valueChanges.subscribe(val => {
      this.updatePreview(val);
    });

    this.obtenerCategorias();
  }

  ngOnDestroy(): void {
    // Libera la URL del objeto creada para el preview, evita fugas de memoria
    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }
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
      complete: () => { this.chr.detectChanges(); }
    });
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    if (this.previewObjectUrl) {
      URL.revokeObjectURL(this.previewObjectUrl);
    }

    // Guardamos el File real para el envío al backend...
    this.selectedFile = file;
    // ...y una URL local liviana solo para mostrar el preview en pantalla
    this.previewObjectUrl = URL.createObjectURL(file);

    // Con patchValue solo marcamos que "hay algo" en el control, para que
    // Validators.required lo considere válido. El nombre del archivo no
    // se usa para nada más que esto.
    this.form.patchValue({ image: file.name });
    this.form.get('image')?.markAsTouched();

    this.updatePreview(this.form.value);
  }

  private updatePreview(val: any): void {
    this.novedad = {
      title: val.title || 'Título de ejemplo',
      content: val.content,
      image: this.previewObjectUrl ?? '',
      categoria: val.categoria,
      is_published: false,
      upload_date: new Date().toISOString(),
      update_date: new Date().toISOString()
    };
    this.chr.detectChanges();
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile) {
      const val = this.form.value;
      this.isSubmitting = true;

      const publicacion: Omit<Publication, 'id' | 'image' | 'upload_date' | 'update_date'> = {
        title: val.title,
        content: val.content,
        categoria: Number(val.categoria),
        is_published: true
      };

      this.novedadesService.crearPublicacion(publicacion, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Publicación guardada:', response);
          this.isSubmitting = false;
          alert('Publicación agregada correctamente');
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          console.error('Error al guardar la publicación:', err);
          this.isSubmitting = false;
          alert('No se pudo guardar la publicación');
        }
      });
    } else {
      this.form.markAllAsTouched();
      if (!this.selectedFile) {
        alert('Debe seleccionar una imagen');
      }
    }
  }

  onCancel(): void {
    if (this.form.dirty) {
      const confirmar = window.confirm('¿Está seguro que desea cancelar? Se perderán los cambios no guardados.');
      if (!confirmar) return;
    }
    this.router.navigate(['/dashboard/home']);
  }
}