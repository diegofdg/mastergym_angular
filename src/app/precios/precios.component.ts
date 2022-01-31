import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/Precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup = new FormGroup({});
  precios: any[] = new Array<any>();
  esEditar: boolean = false;
  id: string | undefined;

  constructor(
    private fb: FormBuilder, 
    private db: AngularFirestore, 
    private msj: MensajesService
  ) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: [ '', Validators.required]
    });

    this.db.collection<Precio>('precios').get().subscribe((resultado) => {
      resultado.docs.forEach((dato) => {
        let precio:any = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      });
    });

    this.mostrarPrecios();
  }

  mostrarPrecios() {
    this.db.collection<Precio>('precios').get().subscribe((resultado)=>{
      this.precios.length = 0;
      resultado.docs.forEach((dato)=>{
        let precio:any = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      });
    });
  }

  agregar() {
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value)
      .then(() => {
        this.msj.mostrarMensaje('Agregado', 'Se agrego correctamente', 'success');
        this.formularioPrecio.reset();
        this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mostrarMensaje('Error', 'Ocurrio un error', 'error');
    })    
  }

  editarPrecio(precio: Precio) {
    this.esEditar = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    });

    this.id = precio.id;
  }

  editar() {
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value)
      .then(()=>{
        this.msj.mostrarMensaje('Editado', 'Se edito correctamente', 'success');        
        this.esEditar = false;
        this.formularioPrecio.reset();
        this.mostrarPrecios();
    }).catch(()=>{
      this.msj.mostrarMensaje('Error', 'Ocurrio un error', 'error');
    });
  }
}