import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { Botao } from '../../components/botao/botao';
import { RouterLink } from '@angular/router';
import { Input } from '../../components/input/input';

@Component({
  selector: 'app-cadastro-geral',
  imports: [Card, Botao, RouterLink, Input],
  templateUrl: './cadastro-geral.html',
  styleUrl: './cadastro-geral.css',
})
export class CadastroGeral {}
