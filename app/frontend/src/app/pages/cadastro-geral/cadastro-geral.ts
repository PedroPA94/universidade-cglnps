import { Component } from '@angular/core';
import { Layout } from '../../components/layout/layout';
import { Card } from '../../components/card/card';
import { Botao } from '../../components/botao/botao';

@Component({
  selector: 'app-cadastro-geral',
  imports: [Layout, Card, Botao],
  templateUrl: './cadastro-geral.html',
  styleUrl: './cadastro-geral.css',
})
export class CadastroGeral {}
