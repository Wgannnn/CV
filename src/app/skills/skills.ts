import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills {
  private static hasAnimated = false;
  skills = [
    { name: 'English', level: 100},
    { name: 'HTML/CSS', level: 95},
    { name: 'Angular', level: 90 },
    { name: 'JavaScript', level: 90},
    { name: 'TypeScript', level: 85 },
    { name: 'Git', level: 85 },
    { name: 'Python', level: 80},
    { name: 'SQL', level: 75},
    { name: 'Node.js', level: 70},
    { name: 'C++', level: 70}
  ];
}
