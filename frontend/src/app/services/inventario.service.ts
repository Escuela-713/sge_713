import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bien } from '../models/bien.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private bienesSubject = new BehaviorSubject<Bien[]>(this.getInitialData());
  bienes$ = this.bienesSubject.asObservable();

  constructor() {
    // Cargar datos del localStorage al iniciar
    const savedData = localStorage.getItem('inventario');
    if (savedData) {
      this.bienesSubject.next(JSON.parse(savedData));
    }
  }

  private getInitialData(): Bien[] {
    return [
      // Sillas
      {
        id: 'SLL-001',
        nombre: 'Sillas de Aula',
        codigo: 'SLL-001',
        ubicacion: 'Aula 1',
        cantidad: 30,
        estado: 'Bueno',
        descripcion: 'Sillas escolares de plástico reforzado color azul',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-01-15'),
        ultimaActualizacion: new Date('2025-01-15')
      },
      {
        id: 'SLL-002',
        nombre: 'Sillas de Laboratorio',
        codigo: 'SLL-002',
        ubicacion: 'Laboratorio',
        cantidad: 25,
        estado: 'Regular',
        descripcion: 'Sillas altas para laboratorio con respaldo ajustable',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-02-01'),
        ultimaActualizacion: new Date('2025-02-01')
      },
      {
        id: 'SLL-003',
        nombre: 'Sillas de Biblioteca',
        codigo: 'SLL-003',
        ubicacion: 'Biblioteca',
        cantidad: 20,
        estado: 'Bueno',
        descripcion: 'Sillas acolchadas para biblioteca con apoyabrazos',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-02-15'),
        ultimaActualizacion: new Date('2025-02-15')
      },
      {
        id: 'SLL-004',
        nombre: 'Sillas de Profesores',
        codigo: 'SLL-004',
        ubicacion: 'Sala de profesores',
        cantidad: 15,
        estado: 'Bueno',
        descripcion: 'Sillas ergonómicas con ruedas para profesores',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-03-01'),
        ultimaActualizacion: new Date('2025-03-01')
      },
      {
        id: 'SLL-005',
        nombre: 'Sillas de Auditorio',
        codigo: 'SLL-005',
        ubicacion: 'Auditorio',
        cantidad: 100,
        estado: 'Regular',
        descripcion: 'Sillas plegables para eventos en auditorio',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-03-15'),
        ultimaActualizacion: new Date('2025-03-15')
      },
      
      // Mesas
      {
        id: 'MSA-001',
        nombre: 'Mesas de Aula',
        codigo: 'MSA-001',
        ubicacion: 'Aula 1',
        cantidad: 15,
        estado: 'Bueno',
        descripcion: 'Mesas bipersonales para aula con porta útiles',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-01-20'),
        ultimaActualizacion: new Date('2025-01-20')
      },
      {
        id: 'MSA-002',
        nombre: 'Mesas de Laboratorio',
        codigo: 'MSA-002',
        ubicacion: 'Laboratorio',
        cantidad: 10,
        estado: 'Bueno',
        descripcion: 'Mesas de trabajo para laboratorio con superficie resistente a químicos',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-02-05'),
        ultimaActualizacion: new Date('2025-02-05')
      },
      {
        id: 'MSA-003',
        nombre: 'Mesas de Biblioteca',
        codigo: 'MSA-003',
        ubicacion: 'Biblioteca',
        cantidad: 8,
        estado: 'Regular',
        descripcion: 'Mesas de lectura grupales con conexiones eléctricas',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-02-20'),
        ultimaActualizacion: new Date('2025-02-20')
      },
      {
        id: 'MSA-004',
        nombre: 'Mesas de Reunión',
        codigo: 'MSA-004',
        ubicacion: 'Sala de profesores',
        cantidad: 2,
        estado: 'Bueno',
        descripcion: 'Mesas de reunión ovaladas con capacidad para 8 personas',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-03-05'),
        ultimaActualizacion: new Date('2025-03-05')
      },
      {
        id: 'MSA-005',
        nombre: 'Mesas de Informática',
        codigo: 'MSA-005',
        ubicacion: 'Sala de Informática',
        cantidad: 12,
        estado: 'Bueno',
        descripcion: 'Mesas para computadoras con pasacables y porta CPU',
        categoria: 'Mobiliario',
        fechaRegistro: new Date('2025-03-20'),
        ultimaActualizacion: new Date('2025-03-20')
      }
    ];
  }

  getBienes(): Observable<Bien[]> {
    return this.bienes$;
  }

  getBienById(id: string): Bien | undefined {
    return this.bienesSubject.value.find(bien => bien.id === id);
  }

  addBien(bien: Bien): void {
    const bienes = [...this.bienesSubject.value, bien];
    this.bienesSubject.next(bienes);
    this.saveToLocalStorage(bienes);
  }

  updateBien(bien: Bien): void {
    const bienes = this.bienesSubject.value.map(b => 
      b.id === bien.id ? { ...bien, ultimaActualizacion: new Date() } : b
    );
    this.bienesSubject.next(bienes);
    this.saveToLocalStorage(bienes);
  }

  deleteBien(id: string): void {
    const bienes = this.bienesSubject.value.filter(b => b.id !== id);
    this.bienesSubject.next(bienes);
    this.saveToLocalStorage(bienes);
  }

  private saveToLocalStorage(bienes: Bien[]): void {
    localStorage.setItem('inventario', JSON.stringify(bienes));
  }

  // Método para generar un nuevo ID único
  generateNewId(prefix: string): string {
    const existingIds = this.bienesSubject.value
      .filter(b => b.id.startsWith(prefix))
      .map(b => parseInt(b.id.split('-')[1]));
    const maxId = Math.max(0, ...existingIds);
    return `${prefix}-${String(maxId + 1).padStart(3, '0')}`;
  }

  // Método para filtrar bienes
  filterBienes(searchTerm: string): Bien[] {
    searchTerm = searchTerm.toLowerCase();
    return this.bienesSubject.value.filter(bien =>
      bien.nombre.toLowerCase().includes(searchTerm) ||
      bien.codigo.toLowerCase().includes(searchTerm) ||
      bien.ubicacion.toLowerCase().includes(searchTerm)
    );
  }
}