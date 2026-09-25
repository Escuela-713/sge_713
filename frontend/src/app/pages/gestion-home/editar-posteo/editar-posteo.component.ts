import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { NovedadesService, Publication } from '../../../services/novedades.service';
import { CategoriasService, Categoria } from '../../../services/categorias.service';

@Component({
  selector: 'app-editar-posteo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-posteo.component.html',
  styleUrls: ['./editar-posteo.component.css']
})
export class EditarPosteoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  novedad = signal<any | null>(null);
  originalNovedad: Publication | null = null;
  categorias: Categoria[] = [];
  isLoading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private novedadesService: NovedadesService,
    private categoriasService: CategoriasService
  ) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      categoria: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.form.valueChanges.subscribe(val => {
      this.updatePreview(val);
    });

    this.obtenerCategorias();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = Number(params.get('id'));
        if (id) {
          this.loadNovedad(id);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  obtenerCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  private async loadNovedad(id: number): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const card = await firstValueFrom(this.novedadesService.getCardById(id));
      this.originalNovedad = card || null;

      if (this.originalNovedad) {
        this.form.patchValue({
          image: this.originalNovedad.image,
          title: this.originalNovedad.title,
          categoria: this.originalNovedad.categoria,
          content: this.originalNovedad.content
        });
        document.title = `Editando: ${this.originalNovedad.title} - SGE 713`;
        this.updatePreview(this.form.value);
      } else {
        this.error = 'Novedad no encontrada';
      }
    } catch (error) {
      console.error('Error cargando la publicación:', error);
      this.error = 'Error al cargar la publicación';
    } finally {
      this.isLoading = false;
    }
  }

  private updatePreview(val: any): void {
    const categoriaSeleccionada = this.categorias.find(c => c.id === val.categoria);
    this.novedad.set({
      image: val.image || (this.originalNovedad?.image || ''),
      title: val.title || 'Título de ejemplo',
      categoriaTitle: categoriaSeleccionada?.title || 'Sin categoría',
      content: val.content || 'Contenido de ejemplo',
      upload_date: this.originalNovedad?.upload_date || new Date().toISOString()
    });
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ image: reader.result });
      this.form.get('image')?.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.valid && this.originalNovedad) {
      const val = this.form.value;
      const payload: Partial<Publication> = {
        title: val.title,
        content: val.content,
        image: val.image,
        categoria: val.categoria,
        update_date: new Date().toISOString()
      };

      (async () => {
        try {
          await firstValueFrom(
            this.novedadesService.updateCard(this.originalNovedad!.id, payload)
          );
          alert('Publicación actualizada');
          this.router.navigate(['/dashboard/home']);
        } catch (err) {
          console.error('Error guardando publicación', err);
          alert('Error al guardar la publicación');
        }
      })();
    } else {
      this.form.markAllAsTouched();
      alert('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  onCancel(): void {
    if (this.hasChanges()) {
      const confirmLeave = confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.');
      if (confirmLeave) {
        this.goBack();
      }
    } else {
      this.goBack();
    }
  }

  onDelete(): void {
    if (this.originalNovedad) {
      const confirmDelete = confirm('¿Está seguro de querer eliminar esta publicación?');

      if (confirmDelete) {
        (async () => {
          try {
            await firstValueFrom(this.novedadesService.deleteCardById(this.originalNovedad!.id));
            alert(`PUBLICACIÓN ELIMINADA:\n"${this.originalNovedad!.title}" ha sido eliminada correctamente.`);
            this.router.navigate(['/dashboard/home']);
          } catch (err) {
            console.error('Error eliminando publicación', err);
            alert('No se pudo eliminar la publicación');
          }
        })();
      }
    }
  }

  private hasChanges(): boolean {
    if (!this.originalNovedad) return false;

    const currentValues = this.form.value;
    return (
      currentValues.title !== this.originalNovedad.title ||
      currentValues.content !== this.originalNovedad.content ||
      currentValues.image !== this.originalNovedad.image ||
      currentValues.categoria !== this.originalNovedad.categoria
    );
  }

  public goBack(): void {
    this.location.back();
  }
}