import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

interface Lesson {
  id: number;
  title: string;
  duration?: string;
  youtube_url: string;
  description?: string;
  notes_url?: string;
  quiz_url?: string;
  available_from?: string;
  available_until?: string;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);

  lessons: Lesson[] = [];
  selectedLesson: Lesson | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  loading: boolean = true;

  ngOnInit() {
    this.http.get<Lesson[]>('http://localhost:8888/api/videos').subscribe({
      next: (data) => {
        this.lessons = data;
        if (this.lessons.length > 0) {
          this.selectedLesson = this.lessons[0];
          this.updateVideoUrl();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching lessons:', err);
        this.loading = false;
      }
    });
  }

  selectLesson(lesson: Lesson) {
    this.selectedLesson = lesson;
    this.updateVideoUrl();
  }

  private updateVideoUrl() {
    if (!this.selectedLesson || !this.selectedLesson.youtube_url) {
      this.safeVideoUrl = null;
      return;
    }
    
    // Extract video ID from youtube URL
    let videoId = '';
    const url = this.selectedLesson.youtube_url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    } else {
      videoId = url; // fallback
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  isAttachmentsAvailable(): boolean {
    if (!this.selectedLesson) return false;
    
    const now = new Date();
    
    if (this.selectedLesson.available_from) {
      const fromDate = new Date(this.selectedLesson.available_from);
      if (now < fromDate) return false;
    }
    
    if (this.selectedLesson.available_until) {
      const untilDate = new Date(this.selectedLesson.available_until);
      if (now > untilDate) return false;
    }
    
    return true;
  }
}
