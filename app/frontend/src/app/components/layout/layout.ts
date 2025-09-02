import { Component } from '@angular/core';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
