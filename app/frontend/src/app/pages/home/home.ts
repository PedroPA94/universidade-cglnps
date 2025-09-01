import { Component } from '@angular/core';
import { Botao } from '../../components/botao/botao';
import { Card } from '../../components/card/card';
import { Layout } from '../../components/layout/layout';

@Component({
  selector: 'app-home',
  imports: [Botao, Card, Layout],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
