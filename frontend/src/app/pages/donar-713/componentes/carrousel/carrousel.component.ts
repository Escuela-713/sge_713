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

  slides: Slide[] = [];

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

  startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}