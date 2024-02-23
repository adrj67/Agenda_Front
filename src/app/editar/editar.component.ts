import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {

  usuario:any = {};
  contacto:any = {};
  id:number = 0;
  loading:boolean = false;
  

  constructor(private formBuilder: FormBuilder, 
    //private formGroup: FormGroup,
    private http: HttpClient,  
    private route:ActivatedRoute) {  
      this.contacto = this.formBuilder.group({ // this.formGroup.value({ ó this.formBuilder.group({ 
        usuariocorreo: this.usuario.correo,
        idcontacto: this.id,
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefonoList: [''],
        correoList: [''],
        direccionList: [''],
      }); 
      this.contacto.updateValueAndValidity();
    }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el parámetro 'id' de string a número
      this.getContactoPorId(this.id);
    });
    
    const id = this.id; 
    this.getContactoPorId(id).subscribe({
      next: (data:any) => {  
        //console.log("ID de contacto: " + this.id);
        this.contacto = data;
      },
      error: (error:any) => {
        console.error('Error al cargar el contacto en ngOnInit():', error);
      }
    });
  }
  

  
  //===== Trae datos por ID ========================================================================
  getContactoPorId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/contacto/buscar/${id}`).pipe(
      //catchError(this.handleError)
    );
  } 
  //===== FIN Trae datos por ID ================================================
 
  //===== 2 Guardar cambios ====================================================
  onUpdate(): void{
    //console.log('Iniciando onUpdate()...');
    const id = this.route.snapshot.params['id'];
    alert('Contacto actualizado exitosamente.');
    this.update(id, this.contacto).subscribe({
      next: data => {
        //console.log('Respuesta del backend:', data);
        
    },    
    error: err => {
        console.error('Error al crear contacto:', err);
    }
    });
    //console.log('Finalizando onUpdate()...');
    location.href = "/home";
  }

  public update(id: number, contacto: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/contacto/update/${this.id}`, contacto); // ver que hay que cambiar comillas '' por `` cuando lleva parametros
  }

  agregarTelefono() {
    // Agrega el teléfono al arreglo en el componente
    this.contacto.telefonoList.push({ numero: '', contactoIdcontacto:this.id});
  }
 
  agregarCorreo() {
    // Agrega el correo al arreglo en el componente
    this.contacto.correoList.push({ correo: '', contactoIdcontacto:this.id});
  }
  
  agregarDireccion() {
    // Agrega la direccion al arreglo en el componente
    this.contacto.direccionList.push({ descripcion: '', contactoIdcontacto:this.id});
  }

  // ============ Borrar Telefono - Correo - Direcciones ========================
  borrarTelefono(telefono: any) {
    const index = this.contacto.telefonoList.indexOf(telefono);
    if (index > -1) {
      this.contacto.telefonoList.splice(index,   1);
    }
  
    this.http.delete(`http://localhost:8080/contacto/telefono/eliminar/${telefono.idtelefono}`).subscribe({
      next: () => {
        alert('Telefono eliminado exitosamente.');
        this.getContactoPorId(this.id).subscribe((data: any) => {
          this.contacto = data;
          location.href = "/home";
        });
      },
      error: (error: any) => {
        console.error('Error al borrar el telefono:', error);
      }
    });
  }

  borrarCorreo(correo: any) {
    // Encuentra el índice del correo que deseas eliminar
    const index = this.contacto.correoList.indexOf(correo);
    if (index > -1) {
      // Remueve el correo del arreglo
      this.contacto.correoList.splice(index,   1);
    }
  
    // Realiza una solicitud DELETE al backend para eliminar el correo de la base de datos
    this.http.delete(`http://localhost:8080/contacto/correo/eliminar/${correo.idcorreo}`).subscribe({
      next: () => {
        alert('Correo eliminado exitosamente.');
        // Aquí puedes redirigir a otra página o realizar otras acciones después de la eliminación
        // También puedes actualizar la lista de correos en la UI
        this.getContactoPorId(this.id).subscribe((data: any) => {
          this.contacto = data;
          location.href = "/home";
        });
      },
      error: (error: any) => {
        console.error('Error al borrar el correo:', error);
      }
    });  
  }

  borrarDireccion(direccion: any) {
    const index = this.contacto.telefonoList.indexOf(direccion);
    if (index > -1) {
      this.contacto.direccionList.splice(index,   1);
    }
  
    this.http.delete(`http://localhost:8080/contacto/direccion/eliminar/${direccion.iddireccion}`).subscribe({
      next: () => {
        alert('Direccion eliminada exitosamente.');
        this.getContactoPorId(this.id).subscribe((data: any) => {
          this.contacto = data;
          location.href = "/home";
        });
      },
      error: (error: any) => {
        console.error('Error al borrar la direccion:', error);
      }
    });  
  }
  // ============FIN  Borrar Telefono - Correo - Direcciones ========================

  logout(){
    localStorage.removeItem("usuario");
    location.href = "/";    
  }
}