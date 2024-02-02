import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // https://www.youtube.com/watch?v=LdUVg6p8XEs&t=184s minuto 1:56
  usuario:any = {rolIdrol:2}; // le asigna automaticamente el rol 2 (usuario)
  loading:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  crear(){
    let formulario:any = document.getElementById("crear");
    let formularioValido:boolean = formulario.reportValidity();
    if (formularioValido){
      this.loading = true;
      this.createService().subscribe(
        data => this.confirmar(data)
      )
    }
  }

  confirmar(resultado:any){
    this.loading = false;
    if(resultado){
     alert("Usuario creado exitosamente.")
     this.usuario = {rolIdrol:2};
     location.href="/";
    }
    else {
      alert("Error al crear el usuario.");
    }
  }

  createService(){
    var httpOptions = {
      headers:new HttpHeaders({ 
        'content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/usuario/guardar", this.usuario, httpOptions)
  }

  regresar(){
    location.href="/";
  }
}
