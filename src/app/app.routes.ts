import { Routes } from '@angular/router';
import { Introduction } from './introduction/introduction';
import { ReadAboutMe } from './read-about-me/read-about-me';
import { CareerHistory } from './career-history/career-history';
import { Contact } from './contact/contact';
import { Skills } from './skills/skills';

export const routes: Routes = [
  { path: '', component: Introduction, data: { animation: 'Home' } },
  { path: 'about', component: ReadAboutMe, data: { animation: 'About' } },
  { path: 'career', component: CareerHistory, data: { animation: 'Career' } },
  { path: 'skills', component: Skills, data: { animation: 'Skills' } },
  { path: 'contact', component: Contact, data: { animation: 'Contact' } },
  { path: '**', redirectTo: '' }
];
