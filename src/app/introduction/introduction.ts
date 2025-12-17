import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.html',
  styleUrls: ['./introduction.css'],
})
export class Introduction {
  images = [
    '1.jpg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg',
    '7.jpg','8.jpeg','9.jpeg','10.jpeg','11.jpeg','12.jpeg'
  ];

  columns = Array(4).fill(0).map(() => this.shuffle([...this.images]));

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
