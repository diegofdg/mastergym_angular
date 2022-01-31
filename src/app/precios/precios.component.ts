import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    this.db.collection('precios').get().subscribe((resultado) => {
      resultado.docs.forEach((dato) => {
        let precio:any = dato.data();
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      });
    });
  }

  agregar() {
    this.db.collection('precios').add(this.formularioPrecio.value)
      .then(() => {
        this.msj.mostrarMensaje('Agregado', 'Se agrego correctamente', 'success');      
    }).catch(()=>{
      this.msj.mostrarMensaje('Error', 'Ocurrio un error', 'error');
    })    
  }

}
