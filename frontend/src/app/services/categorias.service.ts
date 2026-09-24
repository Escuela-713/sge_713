import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
    private categorias: Categoria[] = [
        { id: 1, nombre: 'Evento' },
        { id: 2, nombre: 'Anuncio' },
        { id: 3, nombre: 'Acto Escolar' },
        { id: 4, nombre: 'Publicidad' },
    ];

    constructor() { }

    obtenerCategorias(): Observable<Categoria[]> {
        return of (this.categorias);
    }
}