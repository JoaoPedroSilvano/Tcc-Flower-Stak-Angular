import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu-geral.component.html',
  styleUrls: ['./menu-geral.component.css']
})
export class MenuGeralComponent implements OnInit {

  setLogin: boolean;

  constructor() { 
    this.setLogin = true;
  }

  ngOnInit(): void {
    this.setLogin = localStorage.getItem('idCliente') ? true : false
  }

}
