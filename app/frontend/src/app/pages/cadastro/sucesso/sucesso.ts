import { Component } from '@angular/core';
import { Botao } from '../../../components/botao/botao';
import { Card } from '../../../components/card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  imports: [Card, Botao, RouterLink],
  templateUrl: './sucesso.html',
  styleUrl: './sucesso.css',
})
export class Sucesso {}
