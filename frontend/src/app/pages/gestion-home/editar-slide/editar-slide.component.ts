import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselSlide } from '../home/home.component';

@Component({
  selector: 'app-editar-slide',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-slide.component.html',
  styleUrls: ['./editar-slide.component.css']
})
export class EditarSlideComponent {
  @Input() slide: CarouselSlide | null = null;
  @Output() guardar = new EventEmitter<CarouselSlide>();
  @Output() cancelar = new EventEmitter<void>();

  slideEditado: CarouselSlide = {
    id: 0,
    image: '',
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: ''
  };

  ngOnChanges() {
    if (this.slide) {
      this.slideEditado = { ...this.slide };
    }
  }

  onGuardar() {
    this.guardar.emit(this.slideEditado);
  }

  onCancelar() {
    this.cancelar.emit();
  }
}
