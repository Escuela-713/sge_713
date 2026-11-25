
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, PersonaData } from '@services/autenticacion.service';
import {
  RegionService,
  Pais,
  Provincia,
  Localidad,
} from '@services/regiones.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css',
})
export class EditarPerfilComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private regionService = inject(RegionService);

  perfilForm: FormGroup = this.fb.group({
    primer_nombre: ['', Validators.required],
    segundo_nombre: [''],
    tercer_nombre: [''],
    primer_apellido: ['', Validators.required],
    segundo_apellido: [''],
    fecha_nacimiento: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    genero: ['', Validators.required],
    tipo_sangre: [null],
    calle: ['', Validators.required],
    numero_calle: [null, Validators.required],
    barrio: ['', Validators.required],

    // Ubicación del domicilio
    pais_domicilio: [null, Validators.required],
    provincia_domicilio: [null, Validators.required],
    id_localidad: [null, Validators.required],

    // Lugar de nacimiento
    pais_nacimiento: [null, Validators.required],
    provincia_nacimiento: [null, Validators.required],
    id_localidad_nacimiento: [null, Validators.required],
  });

  paises: Pais[] = [];
  provinciasDomicilio: Provincia[] = [];
  localidadesDomicilio: Localidad[] = [];

  provinciasNacimiento: Provincia[] = [];
  localidadesNacimiento: Localidad[] = [];

  cargando = true;
  guardando = false;
  mensaje = '';
  error = '';

  ngOnInit(): void {
    this.cargarPaises();
  }

  cargarPaises(): void {
    this.regionService.getPaises().subscribe({
      next: (paises) => {
        this.paises = paises;
        this.cargarDatos();
      },
      error: () => {
        this.error = 'No se pudieron cargar los países.';
        this.cargando = false;
      },
    });
  }

  cargarDatos(): void {
    this.cargando = true;

    this.authService.obtenerDatosPersonales().subscribe({
      next: (datos: PersonaData) => {
        this.perfilForm.patchValue({
          primer_nombre: datos.primer_nombre,
          segundo_nombre: datos.segundo_nombre,
          tercer_nombre: datos.tercer_nombre,
          primer_apellido: datos.primer_apellido,
          segundo_apellido: datos.segundo_apellido,
          fecha_nacimiento: datos.fecha_nacimiento,
          email: datos.email,
          telefono: datos.telefono,
          genero: datos.genero,
          tipo_sangre: datos.tipo_sangre,
          calle: datos.calle,
          numero_calle: datos.numero_calle,
          barrio: datos.barrio,
          id_localidad: datos.id_localidad,
          id_localidad_nacimiento: datos.id_localidad_nacimiento,
        });

        this.cargarUbicacionDomicilio(datos.id_localidad);
        this.cargarUbicacionNacimiento(datos.id_localidad_nacimiento);

        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar tus datos personales.';
        this.cargando = false;
      },
    });
  }

  cargarUbicacionDomicilio(localidadId: number): void {
    this.regionService.getUbicacionPorLocalidad(localidadId).subscribe({
      next: (ubicacion) => {
        if (!ubicacion) {
          this.error = 'No se pudo identificar la ubicación de tu domicilio.';
          return;
        }

        this.perfilForm.patchValue({
          pais_domicilio: ubicacion.pais.id,
        });

        this.regionService
          .getProvinciasByPais(ubicacion.pais.id)
          .subscribe({
            next: (provincias) => {
              this.provinciasDomicilio = provincias;

              this.perfilForm.patchValue({
                provincia_domicilio: ubicacion.provincia.id,
              });

              this.regionService
                .getLocalidadesByProvincia(ubicacion.provincia.id)
                .subscribe({
                  next: (localidades) => {
                    this.localidadesDomicilio = localidades;
                  },
                  error: () => {
                    this.error = 'No se pudieron cargar las localidades del domicilio.';
                  },
                });
            },
            error: () => {
              this.error = 'No se pudieron cargar las provincias del domicilio.';
            },
          });
      },
      error: () => {
        this.error = 'No se pudo cargar la ubicación del domicilio.';
      },
    });
  }

  cargarUbicacionNacimiento(localidadId: number): void {
    this.regionService.getUbicacionPorLocalidad(localidadId).subscribe({
      next: (ubicacion) => {
        if (!ubicacion) {
          this.error = 'No se pudo identificar el lugar de nacimiento.';
          return;
        }

        this.perfilForm.patchValue({
          pais_nacimiento: ubicacion.pais.id,
        });

        this.regionService
          .getProvinciasByPais(ubicacion.pais.id)
          .subscribe({
            next: (provincias) => {
              this.provinciasNacimiento = provincias;

              this.perfilForm.patchValue({
                provincia_nacimiento: ubicacion.provincia.id,
              });

              this.regionService
                .getLocalidadesByProvincia(ubicacion.provincia.id)
                .subscribe({
                  next: (localidades) => {
                    this.localidadesNacimiento = localidades;
                  },
                  error: () => {
                    this.error = 'No se pudieron cargar las localidades de nacimiento.';
                  },
                });
            },
            error: () => {
              this.error = 'No se pudieron cargar las provincias de nacimiento.';
            },
          });
      },
      error: () => {
        this.error = 'No se pudo cargar la ubicación de nacimiento.';
      },
    });
  }

  cambiarPaisDomicilio(): void {
    const paisId = Number(this.perfilForm.get('pais_domicilio')?.value);

    this.provinciasDomicilio = [];
    this.localidadesDomicilio = [];

    this.perfilForm.patchValue({
      provincia_domicilio: null,
      id_localidad: null,
    });

    if (!paisId) return;

    this.regionService.getProvinciasByPais(paisId).subscribe({
      next: (provincias) => {
        this.provinciasDomicilio = provincias;
      },
      error: () => {
        this.error = 'No se pudieron cargar las provincias del domicilio.';
      },
    });
  }

  cambiarProvinciaDomicilio(): void {
    const provinciaId = Number(
      this.perfilForm.get('provincia_domicilio')?.value
    );

    this.localidadesDomicilio = [];
    this.perfilForm.patchValue({ id_localidad: null });

    if (!provinciaId) return;

    this.regionService.getLocalidadesByProvincia(provinciaId).subscribe({
      next: (localidades) => {
        this.localidadesDomicilio = localidades;
      },
      error: () => {
        this.error = 'No se pudieron cargar las localidades del domicilio.';
      },
    });
  }

  cambiarPaisNacimiento(): void {
    const paisId = Number(this.perfilForm.get('pais_nacimiento')?.value);

    this.provinciasNacimiento = [];
    this.localidadesNacimiento = [];

    this.perfilForm.patchValue({
      provincia_nacimiento: null,
      id_localidad_nacimiento: null,
    });

    if (!paisId) return;

    this.regionService.getProvinciasByPais(paisId).subscribe({
      next: (provincias) => {
        this.provinciasNacimiento = provincias;
      },
      error: () => {
        this.error = 'No se pudieron cargar las provincias de nacimiento.';
      },
    });
  }

  cambiarProvinciaNacimiento(): void {
    const provinciaId = Number(
      this.perfilForm.get('provincia_nacimiento')?.value
    );

    this.localidadesNacimiento = [];
    this.perfilForm.patchValue({ id_localidad_nacimiento: null });

    if (!provinciaId) return;

    this.regionService.getLocalidadesByProvincia(provinciaId).subscribe({
      next: (localidades) => {
        this.localidadesNacimiento = localidades;
      },
      error: () => {
        this.error = 'No se pudieron cargar las localidades de nacimiento.';
      },
    });
  }

  guardarCambios(): void {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.mensaje = '';
    this.error = '';

    const {
      pais_domicilio,
      provincia_domicilio,
      pais_nacimiento,
      provincia_nacimiento,
      ...datos
    } = this.perfilForm.getRawValue();

    this.authService.modificarDatosPersonales(datos).subscribe({
      next: () => {
        this.mensaje = 'Tus datos personales se actualizaron correctamente.';
        this.guardando = false;
      },
      error: () => {
        this.error = 'No se pudieron actualizar tus datos. Intentá nuevamente.';
        this.guardando = false;
      },
    });
  }
}
