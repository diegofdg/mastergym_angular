import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/Cliente';
import { Inscripcion } from '../models/Inscripcion';
import { Precio } from '../models/Precio';
import { MensajesService } from '../services/mensajes.service';

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
  idPrecio: string = 'null';

  constructor(private db: AngularFirestore, private msj: MensajesService) { }

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
    if(this.inscripcion.validar().esValido) {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precios: this.inscripcion.precios,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }
      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        this.inscripcion =  new Inscripcion();
        this.clienteSeleccionado = new Cliente();
        this.precioSeleccionado = new Precio();
        this.idPrecio = 'null'
        this.msj.mostrarMensaje('Guardado', 'Se guardo correctamente', 'success');
      })
    }
    else{
      this.msj.mostrarMensaje('Advertencia',this.inscripcion.validar().mensaje, 'error');
    }
  }

  selecionarPrecio(event: any) {
    const id = event.target.value;
    
    if(id != "null"){
      this.precioSeleccionado = this.precios.find(x => x.id == id);
      this.inscripcion.precios = this.precioSeleccionado.ref;
      this.inscripcion.fecha = new Date();

      this.inscripcion.subTotal = this.precioSeleccionado.costo;
      this.inscripcion.iva = this.inscripcion.subTotal * 0.21;
      this.inscripcion.total = this.inscripcion.subTotal  + this.inscripcion.iva;

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

    } else {
      this.precioSeleccionado = new Precio();
      this.inscripcion.fecha = undefined;
      this.inscripcion.fechaFinal = undefined;
      this.inscripcion.precios = undefined;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }    
  }
}