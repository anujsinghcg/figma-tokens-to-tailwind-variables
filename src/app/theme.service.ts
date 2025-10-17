import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDarkMode(enableDark: boolean) {
    const html = document.documentElement;
    if (enableDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.toggleDarkMode(savedTheme === 'dark');
  }
}