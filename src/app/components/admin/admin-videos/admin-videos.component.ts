import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Course {
  id: number;
  title: string;
}

interface Video {
  id?: number;
  course_id: number;
  title: string;
  description?: string;
  youtube_url: string;
  notes_url?: string;
  quiz_url?: string;
  available_from?: string;
  available_until?: string;
  is_locked?: boolean;
  course?: Course;
}

@Component({
  selector: 'app-admin-videos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-videos.component.html',
  styleUrl: './admin-videos.component.css'
})
export class AdminVideosComponent implements OnInit {
  private http = inject(HttpClient);

  videos: Video[] = [];
  courses: Course[] = [];
  
  loading = true;
  saving = false;
  showForm = false;
  isEditing = false;
  
  currentVideo: Video = this.getEmptyVideo();

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    
    // Fetch courses for the dropdown
    this.http.get<Course[]>('http://localhost:8888/api/courses').subscribe(c => {
      this.courses = c;
      
      // Fetch videos with admin=1 to get all URLs even if locked
      this.http.get<Video[]>('http://localhost:8888/api/videos?admin=1').subscribe({
        next: (data) => {
          this.videos = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          alert('حدث خطأ أثناء جلب البيانات');
          this.loading = false;
        }
      });
    });
  }

  openForm() {
    this.currentVideo = this.getEmptyVideo();
    if (this.courses.length > 0) {
      this.currentVideo.course_id = this.courses[0].id;
    }
    this.isEditing = false;
    this.showForm = true;
  }

  editVideo(video: Video) {
    this.currentVideo = { ...video }; // Clone the object
    
    // Format dates for datetime-local input (YYYY-MM-DDThh:mm)
    if (this.currentVideo.available_from) {
      this.currentVideo.available_from = this.currentVideo.available_from.substring(0, 16);
    }
    if (this.currentVideo.available_until) {
      this.currentVideo.available_until = this.currentVideo.available_until.substring(0, 16);
    }
    
    this.isEditing = true;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  saveVideo() {
    this.saving = true;
    
    if (this.isEditing && this.currentVideo.id) {
      // Update
      this.http.put(`http://localhost:8888/api/videos/${this.currentVideo.id}`, this.currentVideo)
        .subscribe({
          next: () => {
            this.saving = false;
            this.showForm = false;
            this.fetchData();
            alert('تم تعديل الدرس بنجاح!');
          },
          error: (err) => {
            this.saving = false;
            console.error(err);
            alert('حدث خطأ أثناء الحفظ');
          }
        });
    } else {
      // Create
      this.http.post('http://localhost:8888/api/videos', this.currentVideo)
        .subscribe({
          next: () => {
            this.saving = false;
            this.showForm = false;
            this.fetchData();
            alert('تمت إضافة الدرس بنجاح!');
          },
          error: (err) => {
            this.saving = false;
            console.error(err);
            alert('حدث خطأ أثناء الحفظ');
          }
        });
    }
  }

  deleteVideo(id?: number) {
    if (!id) return;
    
    if (confirm('هل أنت متأكد من حذف هذا الدرس بشكل نهائي؟')) {
      this.http.delete(`http://localhost:8888/api/videos/${id}`)
        .subscribe({
          next: () => {
            this.fetchData();
            alert('تم الحذف بنجاح!');
          },
          error: (err) => {
            console.error(err);
            alert('حدث خطأ أثناء الحذف');
          }
        });
    }
  }

  private getEmptyVideo(): Video {
    return {
      course_id: 0,
      title: '',
      youtube_url: '',
      description: '',
      notes_url: '',
      quiz_url: '',
      available_from: '',
      available_until: '',
      is_locked: false
    };
  }
}
