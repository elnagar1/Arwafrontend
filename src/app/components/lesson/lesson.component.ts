import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  lessonId: string | null = null;
  lessonData: any = null;

  lessonsContent: any = {
    '1': {
      title: 'Lesson 1: Number Systems in Computers',
      content: `
        <h3>Introduction</h3>
        <p>Computers do not understand human languages or decimal numbers natively. At their core, processors are made of billions of transistors that can only be in one of two states: <strong>ON (1)</strong> or <strong>OFF (0)</strong>.</p>
        
        <h3>The Binary System (Base 2)</h3>
        <p>Because of this hardware limitation, computers use the Binary number system. Every piece of data—text, images, videos—is converted into a sequence of 1s and 0s.</p>
        <div class="code-block" style="background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 8px; font-family: monospace; margin: 15px 0;">
          Decimal '5' = Binary '101'<br>
          Decimal '10' = Binary '1010'
        </div>

        <h3>The Hexadecimal System (Base 16)</h3>
        <p>Reading long strings of binary numbers is difficult for humans. Therefore, computer scientists use the Hexadecimal system to compress binary data. Each hexadecimal digit represents exactly 4 binary bits (a nibble).</p>
      `
    },
    '2': {
      title: 'Lesson 1: Introduction to Logic Gates',
      content: `
        <h3>What is a Logic Gate?</h3>
        <p>A logic gate is a basic building block of a digital circuit. It takes one or more binary inputs and produces a single binary output based on a certain logical rule.</p>
        
        <h3>1. The AND Gate</h3>
        <p>The AND gate outputs 1 only if <strong>ALL</strong> its inputs are 1. If any input is 0, the output is 0. Think of it as a series circuit.</p>

        <h3>2. The OR Gate</h3>
        <p>The OR gate outputs 1 if <strong>AT LEAST ONE</strong> of its inputs is 1. It only outputs 0 if all inputs are 0. Think of it as a parallel circuit.</p>
        
        <h3>3. The NOT Gate (Inverter)</h3>
        <p>The NOT gate takes only one input. It simply flips the input: 0 becomes 1, and 1 becomes 0.</p>
      `
    },
    '3': {
      title: 'Lesson 1: Flowcharts and Pseudocode',
      content: `
        <h3>Why Algorithms?</h3>
        <p>Before writing code in Python or C++, a programmer must design the logic. An algorithm is a step-by-step procedure for solving a problem.</p>
        
        <h3>Pseudocode</h3>
        <p>Pseudocode is an informal high-level description of the operating principle of a computer program. It uses structural conventions of normal programming languages, but is intended for human reading rather than machine reading.</p>
        <div class="code-block" style="background: #1e293b; color: #e2e8f0; padding: 15px; border-radius: 8px; font-family: monospace; margin: 15px 0;">
          START<br>
          INPUT A, B<br>
          SUM = A + B<br>
          PRINT SUM<br>
          END
        </div>
      `
    }
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('id');
      if (this.lessonId && this.lessonsContent[this.lessonId]) {
        this.lessonData = this.lessonsContent[this.lessonId];
      } else {
        this.lessonData = { title: 'Lesson Not Found', content: '<p>Please select a valid lesson from the curriculum.</p>' };
      }
    });
  }
}
