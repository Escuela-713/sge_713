import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NovedadesService } from '@/app/services/novedades.service';

declare var bootstrap: any;

@Component({
  selector: 'app-agregar-slide',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-slide.component.html',
  styleUrls: ['./agregar-slide.component.css']
})  
export class AgregarSlideComponent {
  form: FormGroup;
  imagePreview: string | null = null;
  isSubmitting = false;
  private imageFile: File | null = null;

  @ViewChild('cancelModal') cancelModalElement!: ElementRef;
  private modalInstance: any;

  constructor(
    private fb: FormBuilder,
    private novedadesService: NovedadesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: ['']
    });
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.form.patchValue({ image: reader.result });
      this.form.get('image')?.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  ngAfterViewInit(): void {
    if (this.cancelModalElement) {
      this.modalInstance = new bootstrap.Modal(this.cancelModalElement.nativeElement);
    }
  }

  showSuccessToast = false
  showErrorToast = false
  showAlertToast = false

  async onSubmit(): Promise<void> {
    if (this.form.invalid || !this.imageFile) {
      this.form.markAllAsTouched();
      this.showAlertToast = true
        setTimeout(() => {
          this.showAlertToast = false;
        }, 4000);
        return;
      return;
    }

    try {
      this.isSubmitting = true;
      const values = this.form.value;

      await firstValueFrom(
        this.novedadesService.addSlide(
          { title: values.title, subtitle: values.subtitle },
          this.imageFile
        )
      );

      this.showSuccessToast = true
          setTimeout(() => {
            this.showSuccessToast = false;
            this.router.navigate(['/dashboard/home']);
          }, 2000);
          return;
    } catch (error) {
      console.error('Error al guardar el slide:', error);
      this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false;
          }, 4000);
          return;
    } finally {
      this.isSubmitting = false;
    }
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
}