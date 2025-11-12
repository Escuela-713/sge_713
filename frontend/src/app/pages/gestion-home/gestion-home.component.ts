import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
  import { EditarSlideComponent } from './editar-slide/editar-slide.component';

@Component({
  selector: 'app-gestion-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './gestion-home.component.html',
  styleUrls: ['./gestion-home.component.css']
})
export class GestionHomeComponent implements AfterViewInit {

  @ViewChild('menuToggle') menuToggle!: ElementRef<HTMLButtonElement>;
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    document.title = `Home Dashboard - SGE 713`;

    if (this.menuToggle && this.sidebar) {
      this.menuToggle.nativeElement.addEventListener('click', () => {
        this.sidebar.nativeElement.classList.toggle('active');
      });
    }
  }
}
