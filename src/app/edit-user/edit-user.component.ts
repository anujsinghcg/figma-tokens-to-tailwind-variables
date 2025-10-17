import {ChangeDetectionStrategy, Component, Renderer2} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';
import { provideNativeDateAdapter } from '@angular/material/core'

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatSelectModule,MatCheckboxModule,MatCardModule,MatSlideToggleModule,MatDividerModule,MatDatepickerModule,],
  providers: [
    provideNativeDateAdapter()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-user.component.html',
  styleUrls: [ './edit-user.component.scss',
  '../../styles/design-tokens.css'],
})
export class EditUserComponent {
selectedDate = new Date(2025, 5, 1); // June 01, 2025

constructor(private themeService: ThemeService, private renderer:Renderer2) {}

ngOnInit() {
  this.themeService.initTheme();
  const isLight = document.documentElement.classList.contains('light');
  this.themeService.toggleDarkMode(isLight);
}

toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  this.themeService.toggleDarkMode(!isDark);
  const themeElement = document.querySelector('.theme');
    if (themeElement?.classList.contains('dark')) {
      this.renderer.removeClass(themeElement, 'dark');
    } else {
      this.renderer.addClass(themeElement, 'dark');
    }
}
}
