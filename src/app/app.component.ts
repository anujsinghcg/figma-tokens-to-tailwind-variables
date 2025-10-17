import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-root',
  imports: [EditUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'token-poc';
}
