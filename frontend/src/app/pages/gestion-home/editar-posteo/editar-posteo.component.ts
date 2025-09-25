import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { NovedadesService, Card } from '../../../service/novedades.service';

interface Novedad {
  id: number;
  slug: string;
  backgroundImage: string;
  title: string;
  description: string;
  location: string;
  date: string;
  locationIcon: string;
  dateIcon: string;
}

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
  originalNovedad: Novedad | null = null;
  isLoading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private novedadesService: NovedadesService
  ) {
    this.form = this.fb.group({
      slug: ['', [Validators.required, Validators.minLength(3)]],
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      categoria: ['evento', Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.form.valueChanges.subscribe(val => {
      this.updatePreview(val);
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const slug = params.get('slug');
        if (slug) {
          this.loadNovedad(slug);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadNovedad(slug: string): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const card = await this.novedadesService.getCardBySlug(slug);
      this.originalNovedad = card || null;
      if (this.originalNovedad) {
        let categoria = 'evento';
        if (this.originalNovedad.location && typeof this.originalNovedad.location === 'string') {
          const loc = this.originalNovedad.location.toLowerCase();
          if (loc.includes('anuncio')) {
            categoria = 'anuncio';
          } else if (loc.includes('acto')) {
            categoria = 'acto';
          }
        }
        this.form.patchValue({
          slug: this.originalNovedad.slug,
          image: this.originalNovedad.backgroundImage,
          title: this.originalNovedad.title,
          categoria: categoria,
          content: this.originalNovedad.description
        });
        document.title = `Editando: ${this.originalNovedad.title} - SGE 713`;
        this.updatePreview(this.form.value);
      } else {
        this.error = 'Novedad no encontrada';
      }
    } catch (error) {
      console.error('Error loading novedad:', error);
      this.error = 'Error al cargar la novedad';
    } finally {
      this.isLoading = false;
    }
  }

  private updatePreview(val: any): void {
    this.novedad.set({
      backgroundImage: val.image || (this.originalNovedad?.backgroundImage || ''),
      title: val.title || 'Título de ejemplo',
      location: this.getCategoriaDisplay(val.categoria),
      locationIcon: 'M192 0C139.5 0 96 43.5 96 96c0 35.4 19.4 72.4 56.1 100.8L96 512l96-96c36.7-28.4 56.1-65.4 56.1-100.8 0-52.5-43.5-96-96-96z',
      date: new Date().toLocaleDateString(),
      dateIcon: 'M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64z',
      description: val.content || 'Contenido de ejemplo'
    });
  }

  private getCategoriaDisplay(categoria: string): string {
    switch(categoria) {
      case 'evento': return 'Evento Escolar';
      case 'anuncio': return 'Anuncio Importante';
      case 'acto': return 'Acto Escolar';
      default: return 'Evento Escolar';
    }
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
    if (this.form.valid) {
      const updatedData = {
        ...this.originalNovedad,
        slug: this.form.value.slug,
        title: this.form.value.title,
        description: this.form.value.content,
        location: this.getCategoriaDisplay(this.form.value.categoria),
        backgroundImage: this.form.value.image,
        updatedAt: new Date().toISOString()
      };
      (async () => {
        try {
          if (this.originalNovedad) {
            await this.novedadesService.updateCard(updatedData as Card);
            alert('Posteo actualizado');
          } else {
            await this.novedadesService.addCard(updatedData as any);
            alert('Posteo creado');
          }
          this.router.navigate(['/dashboard/home']);
        } catch (err) {
          console.error('Error guardando novedad', err);
          alert('Error al guardar la novedad');
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
      const confirmDelete = confirm(`¿Está seguro de que desea eliminar la novedad "${this.originalNovedad.title}"?\n\nEsta acción no se puede deshacer.`);
      
      if (confirmDelete) {
        (async () => {
          try {
            await this.novedadesService.deleteCardById(this.originalNovedad!.id);
            alert(`NOVEDAD ELIMINADA:\n"${this.originalNovedad!.title}" ha sido eliminada correctamente.`);
            this.router.navigate(['/dashboard/home']);
          } catch (err) {
            console.error('Error eliminando novedad', err);
            alert('No se pudo eliminar la novedad');
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
      currentValues.content !== this.originalNovedad.description ||
      currentValues.image !== this.originalNovedad.backgroundImage
    );
  }

  public goBack(): void {
    this.location.back();
  }
}