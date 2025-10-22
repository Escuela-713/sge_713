import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NovedadesService } from '../../../services/novedades.service';

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

  constructor(
    private fb: FormBuilder,
    private novedadesService: NovedadesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      buttonText: ['', Validators.required],
      buttonLink: ['', Validators.required]
    });
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.form.patchValue({ image: reader.result });
      this.form.get('image')?.markAsTouched();
    };
    reader.readAsDataURL(file);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      this.isSubmitting = true;
      const values = this.form.value;
      
      await this.novedadesService.addSlide({
        image: values.image,
        title: values.title,
        subtitle: values.subtitle,
        buttonText: values.buttonText,
        buttonLink: values.buttonLink
      });

      alert('Slide agregado correctamente');
      this.router.navigate(['/dashboard/home']);
    } catch (error) {
      console.error('Error al guardar el slide:', error);
      alert('Error al guardar el slide');
    } finally {
      this.isSubmitting = false;
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
