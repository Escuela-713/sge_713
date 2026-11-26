import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-donar-713',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './donar-713.component.html',
  styleUrl: './donar-713.component.css'
})
export class Donar713Component {
  private router = inject(Router);

  readonly homeUrl = '/donar-713/donar-home';
  readonly adminUrl = '/donar-713/editar-evento';

  /** true cuando estamos en el panel de administración (editar evento) */
  get enAdmin(): boolean {
    return this.router.url.split(/[?#]/)[0].endsWith('/editar-evento');
  }

  /**
   * Scrollea suavemente hasta la sección con el id indicado.
   * Si la sección no está en la vista actual (ej: estás en el panel admin),
   * primero navega al home y después scrollea.
   */
  irASeccion(id: string, event: Event): void {
    event.preventDefault();

    const scrollear = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (document.getElementById(id)) {
      scrollear();
    } else {
      this.router.navigateByUrl(this.homeUrl).then(() => setTimeout(scrollear, 50));
    }
  }

  /** Botón "Inicio": si ya estás en el home, vuelve arriba de todo. */
  volverArriba(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}