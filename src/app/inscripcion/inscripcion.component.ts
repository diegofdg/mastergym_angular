import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/Cliente';
import { Inscripcion } from '../models/Inscripcion';
import { Precio } from '../models/Precio';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  nombre: undefined;
  precios: Precio[] = new Array< Precio>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection<Precio>('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio:any = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente() {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar() {
    console.log(this.inscripcion);    
  }

}