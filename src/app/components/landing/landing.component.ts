import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

declare var AOS: any;

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, CommonModule, TranslatePipe, TranslateDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit, OnInit {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);
  
  settings: { [key: string]: string } = {
    whatsapp_number: '01033466109',
    instructor_name_ar: 'أ. أروى عبد الرحمن',
    instructor_name_en: 'Ms. Arwa Abdulrahman',
    instructor_role_ar: 'أستاذة علوم الحاسب',
    instructor_role_en: 'Computer Science Instructor',
    instructor_bio_ar: 'جاري التحميل...',
    instructor_bio_en: 'Loading...',
    instructor_image_url: 'assets/arwa_profile.jpg'
  };

  get localizedName() {
    return this.settings[`instructor_name_${this.translate.currentLang() || 'ar'}`];
  }

  get localizedRole() {
    return this.settings[`instructor_role_${this.translate.currentLang() || 'ar'}`];
  }

  get localizedBio() {
    return this.settings[`instructor_bio_${this.translate.currentLang() || 'ar'}`];
  }

  ngOnInit() {
    this.http.get<{ [key: string]: string }>('http://localhost:8888/api/settings').subscribe({
      next: (data) => {
        if(Object.keys(data).length > 0) {
          this.settings = { ...this.settings, ...data };
        }
      },
      error: (err) => console.error('Failed to load settings', err)
    });
  }

  ngAfterViewInit() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.init({
          duration: 800,
          once: true,
          offset: 100
        });
        AOS.refresh();
      }, 100);
    }
  }
}
