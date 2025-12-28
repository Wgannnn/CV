import { Routes } from '@angular/router';
import { Introduction } from './introduction/introduction';
import { ReadAboutMe } from './read-about-me/read-about-me';
import { CareerHistory } from './career-history/career-history';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Introduction, data: { animation: 'Home' } },
  { path: 'about', component: ReadAboutMe, data: { animation: 'About' } },
  { path: 'projects', component: CareerHistory, data: { animation: 'Projects' } },
  { path: 'contact', component: Contact, data: { animation: 'Contact' } },
  { path: '**', redirectTo: '' }
];
