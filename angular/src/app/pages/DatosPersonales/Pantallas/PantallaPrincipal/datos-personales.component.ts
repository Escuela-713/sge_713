import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  constructor() { }

  isPopupVisible: boolean = false;

  showPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  mostrar2: boolean = false;

  mostrarComponente(componente: string) {
    this.componenteVisible = componente;
  }

  componenteVisible: string | null = null;

  ngOnInit(): void {
  }
  

}
