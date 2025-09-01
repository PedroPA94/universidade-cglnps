import { Component } from '@angular/core';
import { Botao } from '../../components/botao/botao';
import { Card } from '../../components/card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Botao, Card, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
