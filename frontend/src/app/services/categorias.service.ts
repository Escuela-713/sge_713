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
        { id: 1, nombre: 'Anuncio' },
        { id: 1, nombre: 'Acto Escolar' },
        { id: 1, nombre: 'Publicidad' },
    ];

    constructor() { }

    obtenerCategorias(): Observable<Categoria[]> {
        return of (this.categorias);
    }
}