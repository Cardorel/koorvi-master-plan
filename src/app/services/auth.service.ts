import {inject, Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await this.auth.signOut();
  }

  userId() {
    return this.auth.currentUser?.uid;
  }
}
