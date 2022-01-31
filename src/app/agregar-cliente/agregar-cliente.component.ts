import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup = new FormGroup({});
  porcentajeSubida: Number = 0;
  urlImagen: string = '';
  esEditable: boolean = false;
  id: string = '';
  
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private afs: AngularFirestore, private activeRoute: ActivatedRoute) { }

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

    this.id = this.activeRoute.snapshot.params['clienteID'];    

    if(this.id !== undefined) {
      this.esEditable = true;     

      this.afs.doc<any>('clientes' +'/' +  this.id ).valueChanges().subscribe((cliente)=>{
        console.log(cliente);
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().slice(0,10),
          telefono: cliente.telefono,
          cedula: cliente.cedula,
          imgUrl: ''
        });
  
        this.urlImagen = cliente.imgUrl;
  
      });
    }    
  }

  agregar() {
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento );
    console.log(this.formularioCliente.value)
    this.afs.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      console.log('registro creado');      
    });
  }

  editar() {
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento );
    
    this.afs.doc<any>('clientes/' +  this.id ).update(this.formularioCliente.value).then((resultado)=>{    
      console.log('Actualizado correctamente');      
    }).catch(()=>{
     console.log('Ocurrio algún error');
    })

  }

  subirImagen(event:any) {
    if(event.target.files.length > 0) {      
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
          this.urlImagen = url;
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
}