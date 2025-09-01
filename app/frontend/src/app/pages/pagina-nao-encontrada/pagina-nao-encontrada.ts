import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { Botao } from '../../components/botao/botao';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  imports: [Card, Botao, RouterLink],
  templateUrl: './pagina-nao-encontrada.html',
  styleUrl: './pagina-nao-encontrada.css',
})
export class PaginaNaoEncontrada {}
