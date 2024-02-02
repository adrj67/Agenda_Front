import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {

  apiUrl = "http://localhost:8080/contacto/";
  idContacto: string = "";
  usuario:any = {};
  contacto:any = {};
  loading:boolean = false;
  contactos:any = [];

  constructor(
    private http: HttpClient,
    private route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.idContacto = params.get('id') ?? '';
      this.cargarContacto();
    });
    }

    cargarContacto() {
      this.http.get(`${this.apiUrl}update/${this.idContacto}`).subscribe ({
        next: (data) => {
          this.contacto = data
        },
        error: (err:any) => {
          console.error('Error obteniendo datos del contacto:', err);
        }
        });
      }
/*
  buscarContactos(){
    this.loading = true;
    this.buscarContactosServicio().subscribe(
      (response:any)=>this.llenarContactos(response)
    );
  }

  buscarContactosServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/contacto/update/" + this.idContacto).pipe(
      catchError(e=>"Error buscarContactosServicio()")
    )
  }

  llenarContactos(contactos:any){
    this.contactos = contactos;
    this.loading = false;
  }
*/
  volver(){
    //localStorage.setItem("usuario", JSON.stringify(this.usuario));
    //window.history.back();
    history.go(-1)
  }

  update(){}
}
