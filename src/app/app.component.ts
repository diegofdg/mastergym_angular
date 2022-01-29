import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';

  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {
      console.log(usuario);      
    });
  }

  login() {
    this.auth.signInWithEmailAndPassword('correo@correo.com', '123456');
  }
  logout() {
    this.auth.signOut();
  }
}
