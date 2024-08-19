import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


 async login() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    if (this.loginForm.valid){
      try {
        await this.authService.login(email, password);
        await this.router.navigate(['/']);
      } catch (e) {
        console.log(e)
      }
    }else{
      console.log('no valid')
    }
  }
}
