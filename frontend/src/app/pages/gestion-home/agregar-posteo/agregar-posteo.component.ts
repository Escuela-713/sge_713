import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovedadesService, Publication } from '../../../services/novedades.service';
import { CategoriasService, Categoria } from '../../../services/categorias.service';
import { state } from '@angular/animations';

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

    this.selectedFile = file;
    this.previewObjectUrl = URL.createObjectURL(file);

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

  showAlertToast = false
  showErrorToast = false
  showSuccessToast = false

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
          this.showSuccessToast = true
          setTimeout(() => {
            this.showSuccessToast = false;
            this.router.navigate(['/dashboard/home']);
          }, 2000);
          return;
        },
        error: (err) => {
          console.error('Error al guardar la publicación:', err);
          this.isSubmitting = false;
          this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false;
          }, 4000);
          return;
        }
      });
    } else {
      this.form.markAllAsTouched();
      if (!this.selectedFile) {
        this.showAlertToast = true
        setTimeout(() => {
          this.showAlertToast = false;
        }, 4000);
        return;
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