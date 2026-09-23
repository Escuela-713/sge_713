import { Component, OnInit, OnDestroy } from '@angular/core';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

@Component({
  selector: 'app-carrousel',
  standalone: true,
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent implements OnInit, OnDestroy {

  currentSlide = 0;

  private intervalId?: ReturnType<typeof setInterval>;

  slides: Slide[] = [
    {
      image: '../../../../../assets/imgs/dona-sangre.avif',
      title: 'Dona Sangre, Dona Vida',
      description: 'Una donación puede salvar hasta 3 vidas. Únete a nuestra campaña y sé parte del cambio.',
      buttonText: 'Donar Ahora'
    },
    {
      image: '../../../../../assets/imgs/sumate-campana.jpg',
      title: 'Súmate a la Campaña',
      description: 'Estudiantes y comunidad unidos por una causa solidaria. Tu ayuda marca la diferencia.',
      buttonText: 'Más Información'
    },
    {
      image: '../../../../../assets/imgs/cada-gota-cuenta.jpg',
      title: 'Cada Gota Cuenta',
      description: 'Juntos podemos ayudar a quienes más lo necesitan. Participa en nuestros eventos de donación.',
      buttonText: 'Ver Eventos'
    }
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length)
      % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}