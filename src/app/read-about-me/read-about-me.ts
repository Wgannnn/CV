import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-read-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-about-me.html',
  styleUrls: ['./read-about-me.css']
})
export class ReadAboutMe implements AfterViewInit {
  @ViewChild('liveCode', { static: true }) liveCode!: ElementRef<HTMLPreElement>;

  codeBlocks: string[][] = [
    [
      '// Advanced math solver',
      'function integrateEquation(eq, variable) {',
      '  const steps = parseEquation(eq);',
      '  let result = 0;',
      '  for (let i = 0; i < steps.length; i++) {',
      '    result += computeStep(steps[i], variable);',
      '  }',
      '  return result;',
      '}',
      'const answer = integrateEquation("x^3 + 2*x^2", "x");',
      'console.log("Integral =", answer);'
    ],
    [
      '// Cat AI simulation',
      'class CatAI {',
      '  constructor(name, age) {',
      '    this.name = name;',
      '    this.age = age;',
      '  }',
      '  think() { return this.age * Math.random(); }',
      '  speak() { console.log(`${this.name} says: Meow!`); }',
      '}',
      'const pixel = new CatAI("Pixel", 3);',
      'while(pixel.think() < 2) { pixel.speak(); }'
    ],
    [
      '// Recursive algorithms & arrays',
      'function fibonacci(n) {',
      '  if (n <= 1) return n;',
      '  return fibonacci(n-1) + fibonacci(n-2);',
      '}',
      'const sequence = Array.from({length: 15}, (_, i) => fibonacci(i));',
      'console.log("Fibonacci sequence:", sequence);'
    ],
    [
      '// Data processing simulation',
      'const dataset = [12, 5, 8, 130, 44];',
      'const filtered = dataset.filter(x => x > 10).map(x => x * 2);',
      'const sum = filtered.reduce((acc, val) => acc + val, 0);',
      'console.log("Filtered sum:", sum);',
      'function complexTransform(arr) {',
      '  return arr.map(x => Math.sqrt(x) * Math.sin(x));',
      '}',
      'console.log(complexTransform(filtered));'
    ]
  ];

  ngAfterViewInit() {
    this.runSequentialTyping(0);
  }

  runSequentialTyping(blockIndex: number) {
    const container = this.liveCode.nativeElement;
    container.textContent = '';
    const lines = this.codeBlocks[blockIndex];
    let lineIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          const nextIndex = (blockIndex + 1) % this.codeBlocks.length;
          this.runSequentialTyping(nextIndex);
        }, 1500); // pause between blocks
        return;
      }

      const line = lines[lineIndex];
      container.textContent += line[charIndex];
      charIndex++;

      if (charIndex < line.length) {
        setTimeout(typeNextChar, 30 + Math.random() * 40); // faster for realism
      } else {
        container.textContent += '\n';
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 150); // pause between lines
      }
    };

    typeNextChar();
  }
}
