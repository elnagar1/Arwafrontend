import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { BookingComponent } from './components/booking/booking.component';
import { StudentToolsComponent } from './components/student-tools/student-tools.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { TextbookComponent } from './components/textbook/textbook.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminVideosComponent } from './components/admin/admin-videos/admin-videos.component';
import { AdminSettingsComponent } from './components/admin/admin-settings/admin-settings.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'courses', component: CourseListComponent },
    { path: 'videos/:id', component: VideoPlayerComponent },
    { path: 'lesson/:id', component: LessonComponent },
    { path: 'book', component: BookingComponent },
    { path: 'tools', component: StudentToolsComponent },
    { path: 'textbook', component: TextbookComponent },
    { path: 'glossary', component: GlossaryComponent },
    
    // Admin Routes
    { 
        path: 'admin', 
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'videos', pathMatch: 'full' },
            { path: 'videos', component: AdminVideosComponent },
            { path: 'settings', component: AdminSettingsComponent }
        ]
    }
];
