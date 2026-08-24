import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-textbook',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateDirective],
  templateUrl: './textbook.component.html',
  styleUrl: './textbook.component.css'
})
export class TextbookComponent {
  selectedTerm: string = 'part1';

  setTerm(term: string) {
    this.selectedTerm = term;
  }
}
