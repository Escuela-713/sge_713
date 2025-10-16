import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  public currentDate = new Date();

  get currentYear(){
    return this.currentDate.getFullYear()
  }
  constructor() { }

  ngOnInit(): void {
  }  
}
