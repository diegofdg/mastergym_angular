import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup = new FormGroup({});
  porcentajeSubida: Number = 0;  
  
  constructor(private fb: FormBuilder, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    });
  }

  agregar() {
    console.log(this.formularioCliente.value);    
  }

  subirImagen(event:any) {
    let nombre = new Date().getTime().toString();
    let archivo = event.target.files[0];
    let extension =  archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))    
    const ruta = 'clientes/' + nombre  + extension ;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);

    tarea.then((objeto) => {
      console.log(objeto);
      console.log('imagen subida correctamente');      
      
      referencia.getDownloadURL().subscribe((url) => {
        console.log(url);
      });
    });

    tarea.percentageChanges().subscribe((porcentaje) => {
      if(porcentaje !== undefined) {
        this.porcentajeSubida = parseInt( porcentaje.toString());
        const barra:any = document.getElementById('barra');
        barra.style.width = this.porcentajeSubida + '%';
        barra.setAttribute('aria-valuenow', this.porcentajeSubida);
      }
    });
  }
}