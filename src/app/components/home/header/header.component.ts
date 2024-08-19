import {Component, inject, Signal} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interfaces/User";
import {Store} from "@ngrx/store";
import {selectUsers} from "../../../store/reducers/Task.Reducer";
import {Router} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  store = inject(Store);
  userId = this.authService.userId()!;
  users: Signal<User[]> = this.store.selectSignal(selectUsers);
  router = inject(Router);

  async logout() {
    try {
      await this.authService.logout();
      window.location.reload();
      await this.router.navigate(['/login'])
    } catch (e) {
      console.log(e)
    }
  }

  currentUser () {
    return this.users().find(user => user.userId === this.userId);
  }
}
