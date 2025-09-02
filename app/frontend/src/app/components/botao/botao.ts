import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

type EstiloBotao = 'primario' | 'secundario';

@Component({
  selector: 'app-botao',
  imports: [NgClass],
  templateUrl: './botao.html',
  styleUrl: './botao.css',
})
export class Botao {
  estilo = input.required<EstiloBotao>();
  tipo = input('button');
  form = input('');
}
