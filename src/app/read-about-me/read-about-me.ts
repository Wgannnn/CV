import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-about-me.html',
  styleUrls: ['./read-about-me.css']
})
export class ReadAboutMe implements AfterViewInit {
  @ViewChild('leftSection') leftSection!: ElementRef<HTMLDivElement>;
  private startTime!: number;
  private dayDuration = 30000; // 30s full cycle

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.startTime = performance.now();
    this.animateDayNight();
    this.animateLamps(); // start smooth lamp movement
  }

  animateDayNight() {
    const step = (timestamp: number) => {
      const elapsed = (timestamp - this.startTime) % this.dayDuration;
      const progress = elapsed / this.dayDuration; // 0 → 1

      // Smooth cosine-based transition for day/night
      const t = 0.5 * (1 - Math.cos(progress * Math.PI * 2)); // 0 = day, 1 = night

      // Background gradient
      const dayColor = { r: 135, g: 206, b: 235 };
      const nightColor = { r: 10, g: 30, b: 45 };
      const r = Math.round(dayColor.r + (nightColor.r - dayColor.r) * t);
      const g = Math.round(dayColor.g + (nightColor.g - dayColor.g) * t);
      const b = Math.round(dayColor.b + (nightColor.b - dayColor.b) * t);

      this.renderer.setStyle(
        this.leftSection.nativeElement,
        'background',
        `linear-gradient(to top, rgb(${r},${g},${b}), rgb(${Math.round(r * 0.85)},${Math.round(g * 0.85)},${Math.round(b * 0.85)}))`
      );

      // Stars, lamps, headlights opacity
      const stars = this.leftSection.nativeElement.querySelectorAll('.star');
      const lamps = this.leftSection.nativeElement.querySelectorAll('.lamp-bulb');
      const headlights = this.leftSection.nativeElement.querySelectorAll('.headlights');

      stars.forEach(star => this.renderer.setStyle(star, 'opacity', t));
      lamps.forEach(lamp => this.renderer.setStyle(lamp, 'opacity', t));
      headlights.forEach(light => this.renderer.setStyle(light, 'opacity', t));

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  animateLamps() {
    const lamps = this.leftSection.nativeElement.querySelectorAll('.lamp') as NodeListOf<HTMLElement>;
    lamps.forEach((lamp, index) => {
      let pos = parseFloat(lamp.style.left) || index * 20;
      const speed = parseFloat(lamp.style.getPropertyValue('--speed')) || 20;

      const step = () => {
        pos -= 0.03; // movement per frame
        if (pos < -30) pos = 100; // reset to right smoothly
        lamp.style.left = pos + '%';
        requestAnimationFrame(step);
      };
      step();
    });
  }
  changeCD(image: string) {
    const cd = document.getElementById('cd-image') as HTMLImageElement;
    if (cd) {
      cd.src = image;
    }
  }
}
