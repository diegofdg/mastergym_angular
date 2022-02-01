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
  precioSeleccionado: any = new Precio();
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
      });
    });
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

  selecionarPrecio(event: any) {
    const id = event.target.value;
    this.precioSeleccionado = this.precios.find(x => x.id == id);
    this.inscripcion.precios = this.precioSeleccionado.ref;
    this.inscripcion.fecha = new Date();

    if(this.precioSeleccionado.tipoDuracion == 1) {
      let dias: number = this.precioSeleccionado.duracion;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
    
    if(this.precioSeleccionado.tipoDuracion == 2) {
      let dias: number = this.precioSeleccionado.duracion * 7;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 3) {
      let dias: number = this.precioSeleccionado.duracion * 15;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(), this.inscripcion.fecha.getMonth(), this.inscripcion.fecha.getDate() + dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 4) {
      let anio: number = this.inscripcion.fecha.getFullYear();
      let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(anio, meses, dia);
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 5) {
      let anio: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
      let meses = this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(anio, meses, dia);
      this.inscripcion.fechaFinal = fechaFinal;
    }        
  }
}