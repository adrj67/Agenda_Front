import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  usuario:any = {};

  constructor() { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
    if(!this.usuario){
      location.href = "/";
    } else {
      if(this.usuario.rolIdrol != 1){
        location.href = "/";
      }
    }
  }

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/";    
  }

}
// https://www.youtube.com/watch?v=0h8l0hyre_M Parte 8 minuto 0