import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject, takeUntil, firstValueFrom } from 'rxjs';
import { NovedadesService } from '../../../services/novedades.service';
import { CarouselSlide } from '../home-dashboard/home-dashboard.component';

declare var bootstrap: any;

@Component({
  selector: 'app-editar-slide',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-slide.component.html',
  styleUrls: ['./editar-slide.component.css']
})
export class EditarSlideComponent implements OnInit, OnDestroy {
  form: FormGroup;
  originalSlide: CarouselSlide | null = null;
  isLoading = true;
  error: string | null = null;

  private selectedImageFile: File | null = null;

  showAlertToast = false;
  showErrorToast = false;
  showSuccessToast = false;

  private destroy$ = new Subject<void>();

  @ViewChild('cancelModal') cancelModalElement!: ElementRef;
  private modalInstance: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private novedadesService: NovedadesService
  ) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subtitle: ['', Validators.maxLength(200)]
    });
  }

  get imageCtrl(): AbstractControl { return this.form.get('image')!; }
  get titleCtrl(): AbstractControl { return this.form.get('title')!; }
  get subtitleCtrl(): AbstractControl { return this.form.get('subtitle')!; }

  ngAfterViewInit(): void {
    if (this.cancelModalElement) {
      this.modalInstance = new bootstrap.Modal(this.cancelModalElement.nativeElement);
    }
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = Number(params.get('id'));
        if (id) {
          this.loadSlide(id);
        } else {
          this.error = 'Slide no encontrado';
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadSlide(id: number): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const slide = await firstValueFrom(this.novedadesService.getSlideById(id));
      this.originalSlide = slide || null;

      if (this.originalSlide) {
        this.form.reset({
          image: this.originalSlide.image ?? '',
          title: this.originalSlide.title ?? '',
          subtitle: this.originalSlide.subtitle ?? ''
        });
        this.selectedImageFile = null;
      } else {
        this.error = 'Slide no encontrado';
      }
    } catch (err) {
      console.error('Error cargando el slide:', err);
      this.error = 'Error al cargar el slide';
    } finally {
      this.isLoading = false;
    }
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ image: reader.result });
      this.imageCtrl.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.form.invalid || !this.originalSlide) {
      this.form.markAllAsTouched();
      this.showAlertToast = true;
      setTimeout(() => {
        this.showAlertToast = false;
      }, 4000);
      return;
    }

    const val = this.form.value;

    (async () => {
      try {
        await firstValueFrom(
          this.novedadesService.updateSlide(
            this.originalSlide!.id,
            { title: val.title, subtitle: val.subtitle ?? '' },
            this.selectedImageFile ?? undefined
          )
        );
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/dashboard/home']);
        }, 2000);
      } catch (err) {
        console.error('Error guardando el slide:', err);
        this.showErrorToast = true;
        setTimeout(() => {
          this.showErrorToast = false;
        }, 4000);
      }
    })();
  }

  onCancel(): void {
    if (this.form.dirty) {
      if (this.modalInstance) {
        this.modalInstance.show();
      }
      return;
    }
    this.router.navigate(['/dashboard/home']);
  }

  confirmCancel(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.router.navigate(['/dashboard/home']);
  }

  private hasChanges(): boolean {
    if (!this.originalSlide) return false;

    const val = this.form.value;
    return (
      val.title !== (this.originalSlide.title ?? '') ||
      (val.subtitle ?? '') !== (this.originalSlide.subtitle ?? '') ||
      this.selectedImageFile !== null
    );
  }

  public goBack(): void {
    this.location.back();
  }
}