import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  usuario:any = {};
  contacto:any = {};
  contactos:any = [];
  loading:boolean = false;
  filterPost:any = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario") || '{}');
    if(this.usuario.rolIdrol != 1){
      location.href = "/";
    } else {
      this.contacto = {correoList:[], telefonoList:[], direccionList:[]};
      this.buscarContactos();
    }
  }

  buscarContactos(){
    this.loading = true;
    this.buscarContactosServicio().subscribe(
      (response:any)=>this.llenarContactos(response)
    );
  }

  buscarContactosServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/contacto/buscar").pipe(
      catchError(e=>"Error buscarContactosServicio()")
    )
  }

  llenarContactos(contactos:any){
    this.contactos = contactos;
    this.loading = false;
  }

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/";    
  }

  // ========== inicio borrar contacto =====================================
  borrarContacto(id: number) {
  this.http.delete(`http://localhost:8080/contacto/eliminar/${id}`).subscribe({
    next: () => {
      alert('Contacto eliminado exitosamente.');
      this.buscarContactos();
    },
    error: (error: any) => {
      console.error('Error al borrar el contacto:', error);
    }
  });
  }
// ========== FIN borrar contacto =====================================

}