import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BienesService, Bien } from '../../../services/bienes.service';

@Component({
  selector: 'app-bienes-registrados',
  templateUrl: './bienes-registrados.component.html',
  styleUrls: ['./bienes-registrados.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule]
})
export class BienesRegistradosComponent implements OnInit {
  bienes: Bien[] = [];
  bienesFiltrados: Bien[] = [];
  searchTerm: string = '';
  cargando: boolean = true;
  error: string = '';

  constructor(private bienesService: BienesService) { }

  ngOnInit() {
    this.cargarBienes();
  }

  cargarBienes() {
    this.cargando = true;
    this.error = '';
    
    this.bienesService.obtenerBienes().subscribe({
      next: (datos) => {
        this.bienes = datos;
        this.bienesFiltrados = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar bienes:', err);
        this.error = 'Error al cargar los bienes. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  buscar() {
    if (this.searchTerm.trim() === '') {
      this.bienesFiltrados = this.bienes;
    } else {
      const termino = this.searchTerm.toLowerCase();
      this.bienesFiltrados = this.bienes.filter(bien =>
        bien.nombre.toLowerCase().includes(termino) ||
        bien.codigo.toLowerCase().includes(termino) ||
        bien.ubicacion.toLowerCase().includes(termino) ||
        bien.estado.toLowerCase().includes(termino)
      );
    }
  }

  onSearchChange() {
    this.buscar();
  }

  eliminarBien(id: number | undefined) {
    if (!id) return;
    
    if (confirm('¿Estás seguro de que deseas eliminar este bien?')) {
      this.bienesService.eliminarBien(id).subscribe({
        next: () => {
          this.cargarBienes();
        },
        error: (err) => {
          console.error('Error al eliminar bien:', err);
          alert('Error al eliminar el bien');
        }
      });
    }
  }
}
