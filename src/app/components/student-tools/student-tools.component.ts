import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

interface TruthTableRow {
  a: number;
  b: number | null;
  out: number;
}

@Component({
  selector: 'app-student-tools',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, TranslateDirective],
  templateUrl: './student-tools.component.html',
  styleUrl: './student-tools.component.css'
})
export class StudentToolsComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);

  decimalValue: number | null = 0;
  binaryValue: string = '00000000';
  hexValue: string = '00';

  activeTab: string = 'converter';

  selectedLanguage: string = 'python';
  compilerUrl!: SafeResourceUrl;

  // Logic Gates Simulator State
  gateInputA: boolean = false;
  gateInputB: boolean = false;
  selectedGate: string = 'AND';
  gateOutput: boolean = false;

  // Interactive 8-bit board
  bits: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  bitWeights: number[] = [128, 64, 32, 16, 8, 4, 2, 1];
  
  ngOnInit() {
    this.updateCompilerUrl();
    this.calculateGateOutput();
    this.updateBitsFromDecimal();
  }

  selectGate(gate: string) {
    this.selectedGate = gate;
    this.calculateGateOutput();
  }

  toggleInputA() {
    this.gateInputA = !this.gateInputA;
    this.calculateGateOutput();
  }

  toggleInputB() {
    this.gateInputB = !this.gateInputB;
    this.calculateGateOutput();
  }

  calculateGateOutput() {
    const a = this.gateInputA;
    const b = this.gateInputB;
    switch (this.selectedGate) {
      case 'AND':
        this.gateOutput = a && b;
        break;
      case 'OR':
        this.gateOutput = a || b;
        break;
      case 'NOT':
        this.gateOutput = !a;
        break;
      case 'XOR':
        this.gateOutput = a !== b;
        break;
      case 'NAND':
        this.gateOutput = !(a && b);
        break;
      case 'NOR':
        this.gateOutput = !(a || b);
        break;
      default:
        this.gateOutput = false;
    }
  }

  getTruthTableRows(): TruthTableRow[] {
    if (this.selectedGate === 'NOT') {
      return [
        { a: 0, b: null, out: 1 },
        { a: 1, b: null, out: 0 }
      ];
    }
    return [
      { a: 0, b: 0, out: this.calculateRowOutput(false, false) ? 1 : 0 },
      { a: 0, b: 1, out: this.calculateRowOutput(false, true) ? 1 : 0 },
      { a: 1, b: 0, out: this.calculateRowOutput(true, false) ? 1 : 0 },
      { a: 1, b: 1, out: this.calculateRowOutput(true, true) ? 1 : 0 }
    ];
  }

  private calculateRowOutput(a: boolean, b: boolean): boolean {
    switch (this.selectedGate) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'XOR': return a !== b;
      case 'NAND': return !(a && b);
      case 'NOR': return !(a || b);
      default: return false;
    }
  }

  isRowActive(row: any): boolean {
    if (this.selectedGate === 'NOT') {
      return (row.a === (this.gateInputA ? 1 : 0));
    }
    return (row.a === (this.gateInputA ? 1 : 0)) && (row.b === (this.gateInputB ? 1 : 0));
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onLanguageChange() {
    this.updateCompilerUrl();
  }

  private updateCompilerUrl() {
    this.compilerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://onecompiler.com/embed/${this.selectedLanguage}?theme=dark`);
  }

  // Interactive 8-bit board handlers
  toggleBit(index: number) {
    this.bits[index] = this.bits[index] === 1 ? 0 : 1;
    this.updateDecimalFromBits();
  }

  updateDecimalFromBits() {
    let sum = 0;
    for (let i = 0; i < 8; i++) {
      if (this.bits[i] === 1) {
        sum += this.bitWeights[i];
      }
    }
    this.decimalValue = sum;
    this.binaryValue = this.decimalValue.toString(2).padStart(8, '0');
    this.hexValue = this.decimalValue.toString(16).toUpperCase().padStart(2, '0');
  }

  updateBitsFromDecimal() {
    const val = this.decimalValue || 0;
    const clampedVal = Math.min(Math.max(val, 0), 255);
    for (let i = 0; i < 8; i++) {
      this.bits[i] = (clampedVal & (1 << (7 - i))) ? 1 : 0;
    }
  }

  onDecimalChange() {
    if (this.decimalValue !== null && this.decimalValue !== undefined) {
      // Clamp for 8-bit representation (0-255)
      if (this.decimalValue > 255) this.decimalValue = 255;
      if (this.decimalValue < 0) this.decimalValue = 0;
      
      this.binaryValue = this.decimalValue.toString(2).padStart(8, '0');
      this.hexValue = this.decimalValue.toString(16).toUpperCase().padStart(2, '0');
      this.updateBitsFromDecimal();
    } else {
      this.binaryValue = '';
      this.hexValue = '';
      this.bits = [0,0,0,0,0,0,0,0];
    }
  }

  onBinaryChange() {
    if (this.binaryValue) {
      // Remove any non-binary chars
      this.binaryValue = this.binaryValue.replace(/[^01]/g, '').slice(0, 8);
      const parsed = parseInt(this.binaryValue, 2);
      if (!isNaN(parsed)) {
        this.decimalValue = parsed;
        this.hexValue = parsed.toString(16).toUpperCase().padStart(2, '0');
        this.updateBitsFromDecimal();
      }
    } else {
      this.decimalValue = null;
      this.hexValue = '';
      this.bits = [0,0,0,0,0,0,0,0];
    }
  }

  onHexChange() {
    if (this.hexValue) {
      // Remove any non-hex chars
      this.hexValue = this.hexValue.replace(/[^0-9A-Fa-f]/g, '').slice(0, 2).toUpperCase();
      const parsed = parseInt(this.hexValue, 16);
      if (!isNaN(parsed)) {
        this.decimalValue = parsed;
        this.binaryValue = parsed.toString(2).padStart(8, '0');
        this.updateBitsFromDecimal();
      }
    } else {
      this.decimalValue = null;
      this.binaryValue = '';
      this.bits = [0,0,0,0,0,0,0,0];
    }
  }
}
