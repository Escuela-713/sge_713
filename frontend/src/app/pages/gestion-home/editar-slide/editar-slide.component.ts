import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselSlide } from '../home-dashboard/home-dashboard.component';

@Component({
  selector: 'app-editar-slide',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-slide.component.html',
  styleUrls: ['./editar-slide.component.css']
})
export class EditarSlideComponent implements OnChanges {
  @Input() slide: CarouselSlide | null = null;
  @Output() guardar = new EventEmitter<{ slide: CarouselSlide, imageFile: File | null }>();
  @Output() cancelar = new EventEmitter<void>();

  slideEditado: CarouselSlide = {
    id: 0,
    image: '',
    title: '',
    subtitle: ''
  };

  selectedImageFile: File | null = null;

  ngOnChanges() {
    if (this.slide) {
      this.slideEditado = { ...this.slide };
      this.selectedImageFile = null; 
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  onGuardar() {
    
    this.guardar.emit({
      slide: this.slideEditado,
      imageFile: this.selectedImageFile
    });
  }

  onCancelar() {
    this.cancelar.emit();
  }
}
