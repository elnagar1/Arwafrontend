import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TranslateService, TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TranslatePipe, TranslateDirective, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  private http = inject(HttpClient);
  whatsapp_number = '01033466109';
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  constructor(public translate: TranslateService) {
    translate.addLangs(['ar', 'en']);
    translate.setFallbackLang('ar');
    
    // explicitly set active lang
    const browserLang = translate.getBrowserLang();
    const detectedLang = browserLang?.match(/ar|en/) ? browserLang : 'ar';
    translate.use(detectedLang);
    
    // Set initial dir based on current language or default
    const initialLang = translate.currentLang() || 'ar';
    this.updateDirection(initialLang);
  }

  ngOnInit() {
    this.http.get<{ [key: string]: string }>('http://localhost:8888/api/settings').subscribe({
      next: (data) => {
        if(data['whatsapp_number']) {
          this.whatsapp_number = data['whatsapp_number'];
        }
      },
      error: (err) => console.error('Failed to load settings in nav', err)
    });
  }

  switchLanguage() {
    const currentLang = this.translate.currentLang() || 'ar';
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(nextLang);
    this.updateDirection(nextLang);
  }

  private updateDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
}
