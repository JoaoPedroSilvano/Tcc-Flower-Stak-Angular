import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu-geral.component.html',
  styleUrls: ['./menu-geral.component.css']
})
export class MenuGeralComponent implements OnInit {

  setLogin: boolean;
  loginAdmin: boolean;

  constructor() { 
    this.setLogin = true;
    this.loginAdmin = false;
  }

  ngOnInit(): void {
    this.getTipo();
    this.setLogin = localStorage.getItem('idCliente') ? true : false
  }

  getTipo() {
    localStorage.getItem('Funcao') ? localStorage.getItem('Funcao') === "Admin" ? this.loginAdmin = true : this.loginAdmin = false : null
  }

}
