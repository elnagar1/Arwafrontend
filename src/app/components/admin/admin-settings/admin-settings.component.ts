import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit {
  private http = inject(HttpClient);

  settings: { [key: string]: string } = {
    whatsapp_number: '',
    instructor_name_ar: '',
    instructor_name_en: '',
    instructor_role_ar: '',
    instructor_role_en: '',
    instructor_bio_ar: '',
    instructor_bio_en: '',
    instructor_image_url: ''
  };

  loading = true;
  saving = false;

  ngOnInit() {
    this.http.get<{ [key: string]: string }>('http://localhost:8888/api/settings').subscribe({
      next: (data) => {
        // Merge fetched data with defaults
        this.settings = { ...this.settings, ...data };
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert('حدث خطأ أثناء تحميل الإعدادات');
        this.loading = false;
      }
    });
  }

  saveSettings() {
    this.saving = true;
    this.http.post('http://localhost:8888/api/settings', this.settings).subscribe({
      next: () => {
        this.saving = false;
        alert('تم حفظ الإعدادات بنجاح! ستظهر التحديثات في الموقع مباشرة.');
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        alert('حدث خطأ أثناء الحفظ');
      }
    });
  }
}
