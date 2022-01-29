import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup = new FormGroup({});
  datosCorrectos: boolean = true;
  textoError: string = '';

  constructor(private creadorFormulario: FormBuilder, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  ingresar() {
    if(this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario)=>{
        console.log(usuario);
      })
      .catch((error) => {
        console.log(this.formularioLogin.controls);
        console.log(error.message);
        if(error.message === 'Firebase: Error (auth/user-not-found).'){
          this.datosCorrectos = false;
          this.textoError = 'No existe ningún usuario registrado con ese correo.';
        } else if(error.message === 'Firebase: Error (auth/wrong-password).') {
          this.datosCorrectos = false;
          this.textoError = 'El password ingresado es incorrecto.';          
        }
      });
      
    } else {
      this.datosCorrectos = false;
      this.textoError = 'Por favor revisa que los datos estén correctos';
    }
  }
}
